<?php

namespace App\Http\Controllers;

use App\Models\FormaPagamento;
use App\Models\Produto;
use App\Models\User;
use App\Models\VendaItens;
use App\Models\VendaParcela;
use DB;
use App\Models\Venda;
use Illuminate\Http\Request;

class VendasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('venda.index');

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $dados = $request->input();

        $dados['valor_total'] = $dados['valor_total_text'];

        $dadosValidados = \Validator::make($dados, [
            'funcionario_id' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Vendas',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $venda_id = Venda::create($dados)->id;

                foreach ($dados['parcelas'] as $parcela) {
                    $dadosParcela = [
                        'venda_id' => $venda_id,
                        'data_pagamento' => $parcela['data_pagamento'],
                        'valor' => $parcela['valor_text'],
                    ];
                    VendaParcela::create($dadosParcela);
                }

                foreach ($dados['itens'] as $item) {
                    $dadosItem = [
                        'venda_id' => $venda_id,
                        'produto_id' => $item['produto_id'],
                    ];
                    VendaItens::create($dadosItem);
                }

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error store usuario:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  $venda_id
     * @return \Illuminate\Http\Response
     */
    public function show($venda_id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  $venda_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($venda_id)
    {
        $venda = Venda::whereId($venda_id)
            ->with('VendaItens', 'VendaParcelas')
            ->first();

        $venda->VendaItens->transform(function ($item) {
            $item->valor = $item->Produto->valor_unit;
            return $item;
        });

        return response()->json($venda);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param  $venda_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $venda_id)
    {
        $dados = $request->input();
        $venda = Venda::find($venda_id);

        $dados['valor_total'] = $dados['valor_total_text'];

        $dadosValidados = \Validator::make($dados, [
            'funcionario_id' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Vendas',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $venda->update($dados);

                foreach ($dados['parcelas'] as $parcela) {
                    $dadosParcela = [
                        'venda_id' => $venda_id,
                        'data_pagamento' => $parcela['data_pagamento'],
                        'valor' => $parcela['valor_text'],
                    ];
                    if (isset($parcela['nova']) && $parcela['nova']){
                        VendaParcela::create($dadosParcela);
                    }else{
                        $vendaParcela = VendaParcela::find($parcela['id']);
                        $vendaParcela->update($dadosParcela);
                    }
                }

                foreach ($dados['itens'] as $item) {
                    $dadosItem = [
                        'venda_id' => $venda_id,
                        'produto_id' => $item['produto_id'],
                    ];
                    if (isset($item['nova']) && $item['nova']){
                        VendaItens::create($dadosItem);
                    }else{
                        $vendaItens = VendaItens::find($item['id']);
                        $vendaItens->update($dadosItem);
                    }

                }

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error store usuario:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $venda_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($venda_id)
    {
        //
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function atualizar()
    {
        $venda = Venda::whereAtivo(true)->with('Cliente', 'Funcionario', 'FormaPagamento')->get();

        $cliente = User::whereTipo('Cliente')->get();
        $funcionario = User::whereTipo('Vendedor')->get();
        $formapagamento = FormaPagamento::whereAtivo(true)->get();
        $produto = Produto::whereAtivo(true)->get();

        return response()->json([
            'venda' => $venda,
            'cliente' => $cliente,
            'funcionario' => $funcionario,
            'formapagamento' => $formapagamento,
            'produto' => $produto
        ]);
    }

    public function inativaVenda($venda_id)
    {
        Venda::find($venda_id)->update(['ativo' => false]);
        return response()->json('Excluido com sucesso.', 200);
    }

    public function quitar($venda_id)
    {
        Venda::find($venda_id)->update(['parcelamento_quitado' => true]);
        return response()->json('Quitado com sucesso.', 200);
    }
}

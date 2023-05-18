<?php

namespace App\Http\Controllers;

use DB;
use App\Models\FormaPagamento;
use Illuminate\Http\Request;

class FormaPagamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('formapagamento.index');

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $dados = $request->input();

        $dados['ativo'] = true;

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
            'ativo' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Formas de Pagamento',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                FormaPagamento::create($dados);

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error store forma pagamento:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $formasPagamento
     * @return \Illuminate\Http\Response
     */
    public function show($formasPagamento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $formasPagamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($formasPagamento)
    {
        $pagamento = FormaPagamento::find($formasPagamento);

        return response()->json($pagamento);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $formasPagamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $formasPagamento)
    {
        $dados = $request->input();
        $pagamento = FormaPagamento::find($formasPagamento);

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Atualizar Forma de Pagamento',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $pagamento->update($dados);

                DB::commit();
                return response()->json([], 200);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error update forma de pagamento:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $formasPagamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($formasPagamento)
    {
        FormaPagamento::find($formasPagamento)->delete();

        return response()->json('Excluido com sucesso.', 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function atualizar()
    {
        $pagamento = FormaPagamento::all();
        return response()->json($pagamento);
    }
}

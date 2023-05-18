<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('produtos.index');
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

        $dados['ativo'] = true;
        $dados['valor_unit'] = $dados['valor_text'];

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
            'valor_unit' => 'required',
            'ativo' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Produto',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                Produto::create($dados);

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error store produto:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $produtos
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($produtos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Produto $produtos
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($produtos)
    {
        $produto = Produto::find($produtos);

        return response()->json($produto);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param $produtos
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $produtos)
    {
        $dados = $request->input();
        $produto = Produto::find($produtos);

        $dados['valor_unit'] = $dados['valor_text'];

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
            'valor_unit' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Atualizar Produto',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $produto->update($dados);

                DB::commit();
                return response()->json([], 200);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error update produto:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $produtos
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($produtos)
    {
        Produto::find($produtos)->delete();

        return response()->json('Excluido com sucesso.', 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function atualizar()
    {
        $produto = Produto::all();
        return response()->json($produto);
    }
}

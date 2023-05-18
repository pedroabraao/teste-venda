<?php

namespace App\Http\Controllers;

use DB;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('usuario.index');
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

        $dados['password'] = bcrypt($dados['password']);

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
            'email' => 'required',
            'password' => 'required',
            'tipo' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Usuario',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                User::create($dados);

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
     * @param  int  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function show($usuarios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $usuarios
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($usuarios)
    {
        $usuario = User::find($usuarios);

        return response()->json($usuario);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $usuarios
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $usuarios)
    {
        $dados = $request->input();
        $usuario = User::find($usuarios);
        unset($dados['password']);

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required',
            'email' => 'required',
            'tipo' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Atualizar Usuario',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $usuario->update($dados);

                DB::commit();
                return response()->json([], 200);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error update usuario:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()}";
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $usuarios
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($usuarios)
    {
        User::find($usuarios)->delete();

        return response()->json('Excluido com sucesso.', 200);
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function atualizar()
    {
        $usuario = User::all();
        return response()->json($usuario);
    }
}

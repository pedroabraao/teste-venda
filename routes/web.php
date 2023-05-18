<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/;
Route::prefix('admin')->group(function () {
    Route::get('login', [\App\Http\Controllers\Auth\LoginController::class, 'mostraLogin'])->name('login');
    Route::post('login', [\App\Http\Controllers\Auth\LoginController::class, 'login'])->name('acesso');
    Route::get('sair', [\App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
});

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::group(['as' => 'produtos.'], function () {
        Route::get('/produto/atualizar', [\App\Http\Controllers\ProdutosController::class, 'atualizar'])->name('atualizar');
        Route::resource('produto', \App\Http\Controllers\ProdutosController::class);
    });

    Route::group(['as' => 'forma-pagamento.'], function () {
        Route::get('/forma-pagamento/atualizar', [\App\Http\Controllers\FormaPagamentosController::class, 'atualizar'])->name('atualizar');
        Route::resource('forma-pagamento', \App\Http\Controllers\FormaPagamentosController::class);
    });

    Route::group(['as' => 'usuario.'], function () {
        Route::get('/usuario/atualizar', [\App\Http\Controllers\UserController::class, 'atualizar'])->name('atualizar');
        Route::resource('usuario', \App\Http\Controllers\UserController::class);
    });

    Route::group(['as' => 'venda.'], function () {
        Route::get('/venda/atualizar', [\App\Http\Controllers\VendasController::class, 'atualizar'])->name('atualizar');
        Route::get('/venda/inativa-venda/{venda_id}', [\App\Http\Controllers\VendasController::class, 'inativaVenda'])->name('inativa-venda');
        Route::get('/venda/quitar/{venda_id}', [\App\Http\Controllers\VendasController::class, 'quitar'])->name('quitar');
        Route::resource('venda', \App\Http\Controllers\VendasController::class);
    });

    Route::group(['as' => 'relatorio.'], function () {
        Route::get('/relatorio/vendas', [\App\Http\Controllers\RelatoriosController::class, 'vendas'])->name('vendas');
    });

});

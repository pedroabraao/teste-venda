<?php

namespace App\Http\Controllers;

use PDF;
use App\Models\Venda;
use Illuminate\Http\Request;

class RelatoriosController extends Controller
{
    public function vendas()
    {
        $vendas = Venda::with('Cliente', 'Funcionario', 'FormaPagamento', 'VendaItens.Produto', 'VendaParcelas')->get();

        $pdf = PDF::loadView('relatorios.vendas', compact('vendas'));
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("relatorio_vendas.pdf");
    }
}

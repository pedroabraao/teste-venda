<!doctype html>
<html lang="pt-Br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Relatório Vendas</title>
    <style type="text/css">

        * {
            margin: 0;
            padding: 0;
            font-family: 'Arial', Verdana, sans-serif;
        }

        @page {
            margin: 0cm 0cm;
            height: 22cm;
        }

        body {
            margin-top: 3cm;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 2cm;
        }

        fieldset {
            height: 10px;
            margin-top: 15px;
            margin-bottom: 0px;
            border: none;
            border-top: 1px solid #333;
        }

        legend {
            background: #be2834;
            margin-left: -0.29cm;
            text-transform: uppercase;
            padding: 5px;
            margin-top: -20px;
            color: #FFFFFF;

        }

        .h5 span {
            font-weight: normal;
            line-height: 20px
        }

        h5 span {
            font-weight: normal;
            line-height: 20px
        }

        .text-center {
            text-align: center;
        }

        p {
            font-size: 9pt;
        }

        .tabela {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 8pt;
            border-collapse: collapse;
        }

        tr.topo td {
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            text-transform: uppercase;
            font-family: Helvetica, Arial, sans-serif;
            color: #000;
            padding: 3px;
            background-color: #ccc;

        }
        tr.topo2 td {
            border-bottom: 1px solid #ddd;
            /*font-weight: bold;*/
            /*text-transform: uppercase;*/
            font-family: Helvetica, Arial, sans-serif;
            color: #000;
            padding: 3px;
            margin-top: 20px;
            /*background-color: #ccc;*/

        }

        tr.linha {
            color: #000;
            background-color: #F0F0F0;
        }

        tr.linha td {
            /*border-bottom: 1px solid #acacac;*/
            padding: 4px;
        }
    </style>
</head>
<body style="margin: 1cm">
<table class="table" style="width: 100%; border-bottom: 2px #a20505 double">
    <h4 class="text-center">Relatório de Vendas</h4>
{{--        @dd($vendas)--}}

    @if($vendas->count() > 0)
        <table width="100%" border="0" class="tabela" style="margin-top: 10px">
            @foreach($vendas as $venda)
                <tr class="topo">
                    <td class="text-center">Data da venda</td>
                    <td class="text-center">Cliente</td>
                    <td class="text-center">Vendedor</td>
                    <td class="text-center">Valor Total</td>
                    <td class="text-center">Quantidade Parcela</td>
                    <td class="text-center">Quitado</td>
                    <td class="text-center">Venda Ativa</td>
                </tr>
                <tr class="linha">
                    <td class="text-center">{{$venda->created_at_format}}</td>
                    <td class="text-center">{{$venda->cliente_id != null ? $venda->Cliente->nome : 'Não informado'}}</td>
                    <td class="text-center">{{$venda->Funcionario->nome}}</td>
                    <td class="text-center">R$ {{$venda->valor_total_text}}</td>
                    <td class="text-center">{{$venda->parcela_total != null ? $venda->parcela_total : 'Nenhuma'}}</td>
                    <td class="text-center">{{$venda->parcelamento_quitado == true ? 'Quitado' : 'Não está quitado'}}</td>
                    <td class="text-center">{{$venda->ativo == true ? 'Ativo' : 'Inativo'}}</td>
                </tr>
                <br>
                @if(count($venda->VendaItens) > 0)
                    <tr class="topo2">
                        <td class="text-center">Lista de Produtos</td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                    </tr>

                    @foreach($venda->VendaItens as $item)
                        <tr class="linha2">
                            <td class="text-center">{{$item->Produto->nome}}</td>
                            <td class="text-center">R$ {{$item->Produto->valor_text}}</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                        </tr>
                    @endforeach
                @endif
                <br>
                @if(count($venda->VendaParcelas) > 0)
                    <tr class="topo2">
                        <td class="text-center">Parcelamentos</td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                    </tr>

                    @foreach($venda->VendaParcelas as $parcela)
                        <tr class="linha2">
                            <td class="text-center">{{$parcela->data_pagamento_format}}</td>
                            <td class="text-center">R$ {{$parcela->valor_text}}</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                        </tr>
                    @endforeach
                    <br>
                @endif
            @endforeach
        </table>
    @else
        <h5 style="margin-top: 15px; background: #F0F0F0; padding: 5px; text-align: center;">
            Nenhum registro encontrado!
        </h5>
@endif

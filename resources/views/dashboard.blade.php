@extends ('layouts.app')
@section('conteudo')
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Dashboard</h1>
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link text-decoration-none" href="{{route('venda.venda.index')}}"><i
                                class="fas fa-basket-shopping"></i>  Vendas</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link text-decoration-none" href="{{route('produtos.produto.index')}}"><i
                                class="fas fa-cart-shopping"></i>  Produtos</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link text-decoration-none" href="{{route('forma-pagamento.forma-pagamento.index')}}"><i
                                class="fas fa-dollar"></i>  Formas de Pagamento</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link text-decoration-none" href="{{route('usuario.usuario.index')}}"><i
                                class="fas fa-user"></i>  Usuários</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-primary text-white mb-4">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link text-decoration-none" href="{{route('relatorio.vendas')}}"><i
                                class="fas fa-download"></i> Relatório de vendas</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-trophy"></i>
                Ranking Vendedores
            </div>
            <div class="card-body">
                <table class="table table-responsive">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Tiger Nixon</td>
                        <td>Edinburgh</td>
                        <td>61</td>
                        <td>2011/04/25</td>
                        <td>$320,800</td>
                    </tr>
                    <tr>
                        <td>Garrett Winters</td>
                        <td>Tokyo</td>
                        <td>63</td>
                        <td>2011/07/25</td>
                        <td>$170,750</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
@stop

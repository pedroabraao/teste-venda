<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Dashboard - Venda</title>
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet"/>
    <link href="{{ asset('css/fonts.css') }}" rel="stylesheet"/>
    <script type="text/javascript" src="{{mix('js/app.js')}}"></script>

</head>
<body class="sb-nav-fixed">
<div id="app">
    <nav class="navbar p-4 navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="text-white text-decoration-none h5" href="{{route('dashboard')}}">Página Inicial</a>
            <div class="sb-sidenav-footer text-white h5">
                Usuário: {{Auth::user()->nome}}
            </div>
            <form class="d-flex">
                <a class="text-white text-decoration-none" href="{{route('logout')}}">Sair do Sistema</a>
            </form>
        </div>
    </nav>
    <div>
        <div>
            @yield('conteudo')
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Teste Pedro Abraão</div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</div>

<script type="text/javascript" src="{{mix('js/app.js')}}"></script>
<script type="text/javascript" src="{{mix('js/funcoes.js')}}"></script>
@stack('js')
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Login</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet"/>
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet"/>
    <link href="{{ asset('css/fonts.css') }}" rel="stylesheet"/>
</head>
<body class="bg-primary">
<div id="app">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg" style="margin-top: 10rem !important">
                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Acessar o
                                    sistema</h3></div>
                            <div class="card-body">
                                <form method="post" action="{{ route('acesso') }}">
                                    @csrf
                                    <div class="form-floating mb-3">
                                        <input name="email" class="form-control" id="inputEmail" type="email"/>
                                        <label for="inputEmail">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input name="password" class="form-control" id="inputPassword" type="password"/>
                                        <label for="inputPassword">Senha</label>
                                    </div>
                                    <div class="mt-4 mb-0">
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary btn-block" href="login.html">
                                                Entrar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>

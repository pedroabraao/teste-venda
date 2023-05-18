@extends('layouts.app')
@section('conteudo')
    <Produto></Produto>
@stop
@push('js')
    <script src="{{mix('js/admin/produto/app.js')}}"></script>
@endpush

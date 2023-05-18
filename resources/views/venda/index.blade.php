@extends('layouts.app')
@section('conteudo')
    <Venda></Venda>
@stop
@push('js')
    <script src="{{mix('js/admin/venda/app.js')}}"></script>
@endpush

@extends('layouts.app')
@section('conteudo')
    <Usuario></Usuario>
@stop
@push('js')
    <script src="{{mix('js/admin/usuario/app.js')}}"></script>
@endpush

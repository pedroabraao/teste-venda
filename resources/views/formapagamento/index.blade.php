@extends('layouts.app')
@section('conteudo')
    <Pagamento></Pagamento>
@stop
@push('js')
    <script src="{{mix('js/admin/formapagamento/app.js')}}"></script>
@endpush

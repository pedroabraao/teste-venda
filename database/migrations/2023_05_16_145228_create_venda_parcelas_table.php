<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendaParcelasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venda_parcelas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('venda_id')->unsigned()->nullable();
            $table->integer('parcela_total')->unsigned();
            $table->date('data_pagamento');
            $table->boolean('pago');
            $table->decimal('valor', 11, 2);
            $table->boolean('ativo')->default(true);
            $table->timestamps();

            $table->foreign('venda_id')->references('id')->on('vendas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venda_parcelas');
    }
}

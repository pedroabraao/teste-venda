<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cliente_id')->unsigned()->nullable();
            $table->bigInteger('funcionario_id')->unsigned();
            $table->bigInteger('forma_pag_id')->unsigned();
            $table->decimal('valor_total',11,2);
            $table->integer('parcela_total')->unsigned()->nullable();
            $table->boolean('parcelamento_quitado')->nullable();
            $table->boolean('ativo')->default(true);
            $table->timestamps();

            $table->foreign('cliente_id')->references('id')->on('users');
            $table->foreign('funcionario_id')->references('id')->on('users');
            $table->foreign('forma_pag_id')->references('id')->on('formas_pagamentos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendas');
    }
}

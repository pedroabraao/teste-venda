<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendaItensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venda_itens', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('venda_id')->unsigned()->nullable();
            $table->bigInteger('produto_id')->unsigned();
            $table->timestamps();

            $table->foreign('venda_id')->references('id')->on('vendas');
            $table->foreign('produto_id')->references('id')->on('produtos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venda_itens');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FormaPagamento
 *
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento query()
 * @property int $id
 * @property string $nome
 * @property int $ativo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento whereAtivo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento whereNome($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormaPagamento whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FormaPagamento extends Model
{
    use HasFactory;

    protected $table = 'formas_pagamentos';

    protected $fillable = [
        'nome',
        'ativo'
    ];
}

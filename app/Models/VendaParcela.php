<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VendaParcela
 *
 * @property int $id
 * @property int|null $venda_id
 * @property int $parcela_total
 * @property string $data_pagamento
 * @property int $pago
 * @property int $ativo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela query()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereAtivo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereDataPagamento($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela wherePago($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereParcelaTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereVendaId($value)
 * @property string|null $valor
 * @property-read \App\Models\Venda|null $Venda
 * @property-read mixed $valor_text
 * @method static \Illuminate\Database\Eloquent\Builder|VendaParcela whereValor($value)
 * @mixin \Eloquent
 */
class VendaParcela extends Model
{
    use HasFactory;

    protected $fillable = [
        'venda_id',
        'data_pagamento',
        'valor'
    ];

    public function Venda()
    {
        return $this->hasOne(Venda::class, 'venda_id');
    }


    protected $appends = ['valor_text','data_pagamento_format'];

    public function setValorAttribute($value)
    {
        if (gettype($value) == 'string' && strpos($value, ',') !== FALSE) {
            $this->attributes['valor'] = Sistema::convertFloat($value);
        } else {
            $this->attributes['valor'] = ($value);
        }
    }


    public function getValorTextAttribute()
    {
        return Sistema::DinheiroFormat($this->valor);
    }

    public function getDataPagamentoFormatAttribute()
    {
        return Sistema::convertData($this->data_pagamento);
    }


}

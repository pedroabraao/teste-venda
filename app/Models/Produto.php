<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Produto
 *
 * @property int $id
 * @property string $nome
 * @property string $valor_unit
 * @property int $ativo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $valor_text
 * @method static \Illuminate\Database\Eloquent\Builder|Produto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Produto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Produto query()
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereAtivo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereNome($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Produto whereValorUnit($value)
 * @mixin \Eloquent
 */
class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos';

    protected $fillable = [
        'nome',
        'valor_unit',
        'ativo',
    ];

    protected $appends = ['valor_text'];

    public function setValorUnitAttribute($value)
    {
        if (gettype($value) == 'string' && strpos($value, ',') !== FALSE) {
            $this->attributes['valor_unit'] = Sistema::convertFloat($value);
        } else {
            $this->attributes['valor_unit'] = ($value);
        }
    }


    public function getValorTextAttribute()
    {
         return Sistema::DinheiroFormat($this->valor_unit);
    }
}

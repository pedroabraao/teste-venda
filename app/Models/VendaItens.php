<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VendaItens
 *
 * @property int $id
 * @property int|null $venda_id
 * @property int $produto_id
 * @property string $valor_total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens query()
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereProdutoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereValorTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendaItens whereVendaId($value)
 * @property-read \App\Models\Produto|null $Produto
 * @property-read \App\Models\Venda|null $Venda
 * @mixin \Eloquent
 */
class VendaItens extends Model
{
    use HasFactory;

    protected $fillable = [
        'venda_id',
        'produto_id'
    ];

    public function Venda()
    {
        return $this->hasOne(Venda::class, 'id', 'venda_id');
    }

    public function Produto()
    {
        return $this->hasOne(Produto::class, 'id', 'produto_id');
    }
}

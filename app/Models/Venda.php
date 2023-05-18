<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Venda
 *
 * @property int $id
 * @property int|null $cliente_id
 * @property int $funcionario_id
 * @property int $forma_pag_id
 * @property string $valor_total
 * @property int|null $parcela_total
 * @property int|null $parcelamento_quitado
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Venda newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Venda newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Venda query()
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereClienteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereFormaPagId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereFuncionarioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereParcelaTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereParcelamentoQuitado($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereValorTotal($value)
 * @property-read \App\Models\User|null $Cliente
 * @property-read \App\Models\FormaPagamento|null $FormaPagamento
 * @property-read \App\Models\User|null $Funcionario
 * @property int $ativo
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendaItens> $VendaItens
 * @property-read int|null $venda_itens_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendaParcela> $VendaParcelas
 * @property-read int|null $venda_parcelas_count
 * @property-read mixed $valor_total_text
 * @method static \Illuminate\Database\Eloquent\Builder|Venda whereAtivo($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendaItens> $VendaItem
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendaParcela> $VendaParcela
 * @mixin \Eloquent
 */
class Venda extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'funcionario_id',
        'forma_pag_id',
        'valor_total',
        'parcela_total',
        'parcelamento_quitado',
        'ativo'
    ];

    public function Cliente()
    {
        return $this->hasOne(User::class, 'id', 'cliente_id');
    }

    public function Funcionario()
    {
        return $this->hasOne(User::class, 'id', 'funcionario_id');
    }

    public function FormaPagamento()
    {
        return $this->hasOne(FormaPagamento::class, 'id', 'forma_pag_id');
    }

    public function VendaItens()
    {
        return $this->hasMany(VendaItens::class, 'venda_id', 'id');
    }

    public function VendaParcelas()
    {
        return $this->hasMany(VendaParcela::class, 'venda_id', 'id');
    }

    protected $appends = ['valor_total_text', 'created_at_format'];

    public function setValorTotalAttribute($value)
    {
        if (gettype($value) == 'string' && strpos($value, ',') !== FALSE) {
            $this->attributes['valor_total'] = Sistema::convertFloat($value);
        } else {
            $this->attributes['valor_total'] = ($value);
        }
    }

    public function getValorTotalTextAttribute()
    {
        return Sistema::DinheiroFormat($this->valor_total);
    }

    public function getCreatedAtFormatAttribute()
    {
        return Sistema::convertData($this->created_at);
    }

}

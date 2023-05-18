<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Sistema
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Sistema newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sistema newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sistema query()
 * @mixin \Eloquent
 */
class Sistema extends Model
{
    public static function DinheiroFormat($dinheiro)
    {
        return number_format($dinheiro, 2, ',', '.');
    }

    public static function convertFloat($numeroString)
    {
        $numeroString = str_replace('.', '', $numeroString);
        $numeroString = str_replace(',', '.', $numeroString);
        return floatval($numeroString);
    }

    public static function convertData($data)
    {
        $data = new \DateTime($data);

        return date_format($data,'d/m/Y');
    }
}

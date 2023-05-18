<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nome' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'tipo' => 'Administrador',
        ]);

        User::create([
            'nome' => 'Vendedor',
            'email' => 'vendedor@gmail.com',
            'password' => bcrypt('123456'),
            'tipo' => 'Vendedor',
        ]);
        User::create([
            'nome' => 'Cliente1',
            'email' => 'cliente1@gmail.com',
            'password' => bcrypt('123456'),
            'tipo' => 'Cliente',
        ]);
        User::create([
            'nome' => 'Cliente2',
            'email' => 'cliente2@gmail.com',
            'password' => bcrypt('123456'),
            'tipo' => 'Cliente',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    protected $redirectTo = '/admin/dashboard';


    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function mostraLogin()
    {
        return view('auth.login');
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->except(['_token']);

        if (auth()->attempt($credentials)) {

            return redirect()->route('dashboard');

        }else{
            session()->flash('message', 'Credenciais inválidas');
            return redirect()->back();
        }
    }
    public function logout()
    {
        Auth::logout();

        return redirect()->route('login');
    }
}

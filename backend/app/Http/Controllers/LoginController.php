<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;
        
            return response()->json([
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'message' => 'Login successful!'
            ]);
        }
 
        return response()->json([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']); 
        
    }
}

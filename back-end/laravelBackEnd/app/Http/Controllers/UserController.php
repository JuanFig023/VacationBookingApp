<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
    
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);
    
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),
    ]);
    
    return response()->json($user, 201);
    }
    
    public function update(Request $request, $id)
    {
    $user = User::findOrFail($id);
    
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        'password' => 'nullable|string|min:8|confirmed',
    ]);
    
    $user->update([
    'name' => $validatedData['name'],
    'email' => $validatedData['email'],
    'password' => isset($validatedData['password']) ? bcrypt($validatedData['password']) : $user->password,
    ]);
    
    return response()->json($user);
    }
    
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    
        return response()->json(null, 204);
    }
}

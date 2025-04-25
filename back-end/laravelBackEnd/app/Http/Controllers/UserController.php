<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
    
    public function login(Request $request) 
    {
        $validatedData = $request->validate([
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8',
    ]);

        $user = User::where('email', $validatedData['email'])->first();
        if ($user && Hash::check($validatedData['password'], $user->password)) {
        $user-> status = 1; // Set status to true (logged in)
        $user->save();
        return response()->json(['success' => true, 'user' => $user], 200);
        } else {
        return response()->json(['success' => false], 401);
        }
    }

    public function register(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'status' => 0, // Set status to false (logged out)
        ]);
    
        return response()->json(['success' => true, 'user' => $user], 201);
    }

    public function logout(Request $request) {
        $user = User::find($request->user()->id);
        if ($user) {
            $user->status = 0; // Set status to false (logged out)
            $user->save();
            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false], 401);
        }
    }
}

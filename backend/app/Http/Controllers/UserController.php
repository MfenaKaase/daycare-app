<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate(5);
        return response()->json(compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // Validate the incoming request data
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string|max:255',
            'role' => 'required|in:admin,parent,staff',
        ]);

        // Handle file upload for photo
        if ($request->hasFile('photo')) {
            $fileName = time() . '_' . $request->file('photo')->getClientOriginalName();
            $filePath = $request->file('photo')->storeAs('uploads/photos', $fileName, 'public');
            $validatedData['photo'] = $filePath;
        }

        // Hash the password before storing it
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Create a new user
        $user = User::create($validatedData);

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json(compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

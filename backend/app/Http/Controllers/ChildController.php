<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;

class ChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date_of_birth' => 'required|date',
            'allergies' => 'nullable|string|max:500',
            'medical_history' => 'nullable|string',
            'special_needs' => 'nullable|string',
            'parent_id' => 'required|exists:parents,id', // Ensure the parent exists
        ]);

          // Handle photo upload if provided
    if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filePath = $file->store('photos', 'public'); // Save the file in the 'photos' directory within 'storage/app/public'
        $validatedData['photo'] = $filePath;
    }

    // Create the child record
    $child = Child::create($validatedData);

    // Return a success response
    return response()->json([
        'message' => 'Child created successfully.',
        'data' => $child,
    ], 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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

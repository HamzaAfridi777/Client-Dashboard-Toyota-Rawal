<?php

namespace App\Http\Controllers;

use App\Models\Choose;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ChooseController extends Controller
{
    public function index()
    {
        $chooses = Choose::all(); // Fetch all booking records

        return Inertia::render('Choose/Index', [
            'chooses' => $chooses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Choose/Create'); // Adjust path as needed
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
           'heading' => 'nullable|string',
            'description' => 'nullable|string',   
            'years' => 'nullable|string',   
            'technicians' => 'nullable|string', 
            'customer' => 'nullable|string', 
            'employee' => 'nullable|string', 
        ]);

        // Handle file upload
       
        // Update or create the record
        Choose::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('choose.index')->with('success', 'Choose details have been updated.');
    }

    public function edit($id)
    {
        // Find the booking record by ID
        $chooses = Choose::findOrFail($id);

        return Inertia::render('Choose/Edit', [
            'chooses' => $chooses,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'heading' => 'nullable|string',
            'description' => 'nullable|string',   
            'years' => 'nullable|string',   
            'technicians' => 'nullable|string', 
            'customer' => 'nullable|string', 
            'employee' => 'nullable|string', 
        ]);

        // Find the booking record by ID
        $chooses = Choose::findOrFail($id);

        // Update the record
        $chooses->update($validatedData);

        return redirect()->route('choose.index')->with('success', 'Choose details have been updated.');
    }

    public function destroy($id)
    {
        // Find the booking record by ID
        $chooses = Choose::findOrFail($id);

        // Delete the record
        $chooses->delete();

        return redirect()->route('choose.index')->with('success', 'Data has been deleted.');
    }

    public function indexApi()
    {
        $chooses = Choose::all();
     //   dd($$chooses); // Dump and die to inspect data
        return response()->json($chooses);
    }
}
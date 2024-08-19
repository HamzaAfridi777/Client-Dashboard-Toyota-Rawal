<?php

namespace App\Http\Controllers;

use App\Models\ToyotaSure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToyotaSureController extends Controller
{
    public function index()
    {
        $toyotasures = ToyotaSure::all(); // Fetch all booking records

        return Inertia::render('ToyotaSure/Index', [
            'toyotasures' => $toyotasures,
        ]);
    }

    public function create()
    {
        return Inertia::render('ToyotaSure/Create'); // Adjust path as needed
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'nullable|string',
            'heading1' => 'nullable|string',
            'note1' => 'nullable|string',
            'heading2' => 'nullable|string',
            'note2' => 'nullable|string',
            'heading3' => 'nullable|string',
            'note3' => 'nullable|string',
            'image1' => 'nullable|image',
        ]);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/toyota_sure', $originalName);
            $validatedData['image1'] = $originalName;
        }

        // Update or create the record
        ToyotaSure::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('toyota_sure.index')->with('success', 'Toyota Sure details have been updated.');
    }

    public function edit($id)
    {
        // Find the booking record by ID
        $toyotasures = ToyotaSure::findOrFail($id);

        return Inertia::render('ToyotaSure/Edit', [
            'toyotasures' => $toyotasures,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'description' => 'nullable|string',
            'heading1' => 'nullable|string',
            'note1' => 'nullable|string',
            'heading2' => 'nullable|string',
            'note2' => 'nullable|string',
            'heading3' => 'nullable|string',
            'note3' => 'nullable|string',
            'image1' => 'nullable|image',
        ]);

        // Find the booking record by ID
        $toyotasures = ToyotaSure::findOrFail($id);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/toyota_sure', $originalName);
            $validatedData['image1'] = $originalName;
        } else {
            $validatedData['image1'] = $toyotasures->image1;
        }

        // Update the record
        $toyotasures->update($validatedData);

        return redirect()->route('toyota_sure.index')->with('success', 'Toyota Sure details have been updated.');
    }

    public function destroy($id)
    {
        // Find the booking record by ID
        $toyotasures = ToyotaSure::findOrFail($id);

        // Delete the record
        $toyotasures->delete();

        return redirect()->route('toyota_sure.index')->with('success', 'Toyota Sure has been deleted.');
    }

    public function indexApi()
    {
        $toyotasures = ToyotaSure::all();
     //   dd($toyotasures); // Dump and die to inspect data
        return response()->json($toyotasures);
    }
}

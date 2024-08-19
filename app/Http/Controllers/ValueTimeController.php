<?php

namespace App\Http\Controllers;

use App\Models\ValueTime;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ValueTimeController extends Controller
{
    public function index()
    {
        $valuetimes = ValueTime::all(); // Fetch all booking records

        return Inertia::render('ValueTime/Index', [
            'valuetimes' => $valuetimes,
        ]);
    }

    public function create()
    {
        return Inertia::render('ValueTime/Create'); // Adjust path as needed
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
           'heading' => 'nullable|string',
            'description' => 'nullable|string',       
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
        ]);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/value_time', $originalName);
            $validatedData['image1'] = $originalName;
        }
        if ($request->hasFile('image2')) {
            $image = $request->file('image2');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/value_time', $originalName);
            $validatedData['image2'] = $originalName;
        }
        // Update or create the record
        ValueTime::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('value_time.index')->with('success', 'ValueTime details have been updated.');
    }

    public function edit($id)
    {
        // Find the booking record by ID
        $valuetimes = ValueTime::findOrFail($id);

        return Inertia::render('ValueTime/Edit', [
            'valuetimes' => $valuetimes,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'heading' => 'nullable|string',
            'description' => 'nullable|string',       
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
        ]);

        // Find the booking record by ID
        $valuetimes = ValueTime::findOrFail($id);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/value_time', $originalName);
            $validatedData['image1'] = $originalName;
        } else {
            $validatedData['image1'] = $valuetimes->image1;
        }
        if ($request->hasFile('image2')) {
            $image = $request->file('image2');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/car_booking', $originalName);
            $validatedData['image2'] = $originalName;
        } else {
            $validatedData['image2'] = $valuetimes->image2;
        }
        // Update the record
        $valuetimes->update($validatedData);

        return redirect()->route('value_time.index')->with('success', 'ValueTime details have been updated.');
    }

    public function destroy($id)
    {
        // Find the booking record by ID
        $valuetimes = ValueTime::findOrFail($id);

        // Delete the record
        $valuetimes->delete();

        return redirect()->route('value_time.index')->with('success', 'Data has been deleted.');
    }

    public function indexApi()
    {
        $valuetimes = ValueTime::all();
     //   dd($$valuetimes); // Dump and die to inspect data
        return response()->json($valuetimes);
    }
}
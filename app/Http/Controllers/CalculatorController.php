<?php

namespace App\Http\Controllers;

use App\Models\Calculator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CalculatorController extends Controller
{
    public function index()
    {
        $calculators = Calculator::all();

        return Inertia::render('Calculator/Index', [
            'calculators' => $calculators,
        ]);
    }

    public function create()
    {
        return Inertia::render('Calculator/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'service' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'history' => 'nullable|string',
            'calculatorservice' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/Calculator', $originalName);
            $validatedData['image'] = $originalName;
        }

        Calculator::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('calculator.index')->with('success', 'Calculator details have been updated.');
    }

    public function edit($id)
    {
        $calculators = Calculator::findOrFail($id);

        return Inertia::render('Calculator/Edit', [
            'calculators' => $calculators,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'service' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'history' => 'nullable|string',
            'calculatorservice' => 'nullable|string',
        ]);

        $calculators = Calculator::findOrFail($id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/Calculator', $originalName);
            
            // Delete old image if it exists
            if ($calculators->image) {
                Storage::delete('public/uploads/Calculator/' . $calculators->image);
            }
            
            $validatedData['image'] = $originalName;
        }

        $calculators->update($validatedData);

        return redirect()->route('calculator.index')->with('success', 'Calculator details have been updated.');
    }

    public function destroy($id)
    {
        $calculators = Calculator::findOrFail($id);

        // Delete associated image if it exists
        if ($calculators->image) {
            Storage::delete('public/uploads/Calculator/' . $calculators->image);
        }

        $calculators->delete();

        return redirect()->route('calculator.index')->with('success', 'Calculator has been deleted.');
    }

    public function indexApi()
    {
        $calculators = Calculator::all();

        return response()->json($calculators);
    }
}
<?php
// app/Http/Controllers/ComplaintController.php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'department' => 'required|string|max:255',
            'message' => 'nullable|string',
        ]);

        Complaint::create($validatedData);

        return response()->json(['message' => 'Complaint submitted successfully'], 201);
    }

    public function index()
    {
        $complaints = Complaint::all();

        return inertia('CustomerRelations/ComplaintList', ['complaints' => $complaints]);
    }

    public function destroy($id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->delete();

        return redirect()->route('complaints.index')
                         ->with('success', 'Complaint deleted successfully');
    }
}

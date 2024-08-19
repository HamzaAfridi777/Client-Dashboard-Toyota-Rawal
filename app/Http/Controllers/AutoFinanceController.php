<?php

namespace App\Http\Controllers;

use App\Models\AutoFinance;
use Illuminate\Http\Request;

class AutoFinanceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'car' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'landline' => 'required|string|max:15',
            'income' => 'required|numeric',
            'bank' => 'required|string|max:255',
            'comment' => 'nullable|string',
        ]);

        AutoFinance::create($validatedData);

        return response()->json(['message' => 'AutoFinance submitted successfully'], 201);
    }

    public function index()
    {
        $autoFinances = AutoFinance::all();

        return inertia('CustomerRelations/FinanceList', ['autoFinances' => $autoFinances]);
    }

    public function destroy($id)
    {
        $autoFinance = AutoFinance::findOrFail($id);
        $autoFinance->delete();

        return redirect()->route('autoFinances.index')
                         ->with('success', 'AutoFinance  deleted successfully');
    }
}

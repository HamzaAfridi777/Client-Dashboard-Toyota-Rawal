<?php

namespace App\Http\Controllers;

use App\Models\ClientReview;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ClientReviewController extends Controller
{
    public function index()
    {
        $clientreviews = ClientReview::all(); // Fetch all booking records

        return Inertia::render('ClientReview/Index', [
            'clientreviews' => $clientreviews,
        ]);
    }

    public function create()
    {
        return Inertia::render('ClientReview/Create'); // Adjust path as needed
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
           // 'heading' => 'nullable|string',
           // 'description' => 'nullable|string',
            'name' => 'nullable|string',
            'service' => 'nullable|string',
            'servicedescription' => 'nullable|string',
            'image1' => 'nullable|image',
        ]);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = time() . '_' . $image->getClientOriginalName(); // To avoid name conflicts
            $image->storeAs('public/uploads/client_review', $originalName);
            $validatedData['image1'] = $originalName;
        }

        ClientReview::create($validatedData);

        return redirect()->route('client_review.index')->with('success', 'Client Review details have been created.');
    }

    public function edit($id)
    {
        $clientreviews = ClientReview::findOrFail($id);

        return Inertia::render('ClientReview/Edit', [
            'clientreviews' => $clientreviews,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            //'heading' => 'nullable|string',
            //'description' => 'nullable|string',
            'name' => 'nullable|string',
            'service' => 'nullable|string',
            'servicedescription' => 'nullable|string',
            'image1' => 'nullable|image',
        ]);

        $clientreviews = ClientReview::findOrFail($id);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = time() . '_' . $image->getClientOriginalName(); // To avoid name conflicts
            $image->storeAs('public/uploads/client_review', $originalName);
            $validatedData['image1'] = $originalName;
        } else {
            $validatedData['image1'] = $clientreviews->image1;
        }

        // Update the record
        $clientreviews->update($validatedData);

        return redirect()->route('client_review.index')->with('success', 'Client Review details have been updated.');
    }

    public function destroy($id)
    {
        $clientreviews = ClientReview::findOrFail($id);

        $clientreviews->delete();

        return redirect()->route('client_review.index')->with('success', 'Client Review has been deleted.');
    }

    public function indexApi()
    {
        $clientreviews = ClientReview::all();
        return response()->json($clientreviews);
    }
}

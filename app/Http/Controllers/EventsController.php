<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function index()
    {
        $events = Events::all(); // Fetch all booking records

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create'); // Adjust path as needed
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
           'heading' => 'nullable|string',
           'description' => 'nullable|string',
            'image.*' => 'nullable|image',
        ]);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = time() . '_' . $image->getClientOriginalName(); // To avoid name conflicts
            $image->storeAs('public/uploads/events', $originalName);
            $validatedData['image1'] = $originalName;
        }

        Events::create($validatedData);

        return redirect()->route('events.index')->with('success', 'Client Review details have been created.');
    }

    public function edit($id)
    {
        $Eventss = Events::findOrFail($id);

        return Inertia::render('Events/Edit', [
            'events' => $events,
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

        $events = Events::findOrFail($id);

        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = time() . '_' . $image->getClientOriginalName(); // To avoid name conflicts
            $image->storeAs('public/uploads/client_review', $originalName);
            $validatedData['image1'] = $originalName;
        } else {
            $validatedData['image1'] = $events->image1;
        }

        // Update the record
        $events->update($validatedData);

        return redirect()->route('client_review.index')->with('success', 'Client Review details have been updated.');
    }

    public function destroy($id)
    {
        $events = Events::findOrFail($id);

        $events->delete();

        return redirect()->route('client_review.index')->with('success', 'Client Review has been deleted.');
    }

    public function indexApi()
    {
        $events = Events::all();
        return response()->json($events);
    }
}

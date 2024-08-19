<?php

namespace App\Http\Controllers;

use App\Models\ExpertTeam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpertTeamController extends Controller
{
    public function index()
    {
        $expert_teams = ExpertTeam::all(); // Fetch all booking records (to handle as an array)

        return Inertia::render('Team/Index', [
            'expert_teams' => $expert_teams,
        ]);
    }
    public function create()
    {
        return Inertia::render('Team/Create'); // Adjust path as needed
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'role' => 'nullable|string',
            'image' => 'nullable|image',
            
        ]);

       // Handle file upload
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $originalName = $image->getClientOriginalName();
        $image->storeAs('public/uploads/Team', $originalName);
        $validatedData['image'] = $originalName;
    }

        // Update or create the record
        ExpertTeam::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('team.index')->with('success', 'Car Booking details have been updated.');
    }

    public function edit($id)
    {
        // Find the booking record by ID
        $expert_teams = ExpertTeam::findOrFail($id);

        return Inertia::render('Team/Edit', [
            'expert_teams' => $expert_teams,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'role' => 'nullable|string',
            'image' => 'nullable|image',
        ]);
    
        // Find the record by ID
        $expert_teams = ExpertTeam::findOrFail($id);
    
        // Handle file upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/Team', $originalName);
            $validatedData['image'] = $originalName;
        } else {
            // Retain the previous image if no new image is uploaded
            $validatedData['image'] = $expert_teams->image;
        }
    
        // Update the role if provided, otherwise keep the previous one
        if ($request->has('role')) {
            $validatedData['role'] = $request->input('role');
        } else {
            $validatedData['role'] = $expert_teams->role;
        }
    
        // Update the record
        $expert_teams->update($validatedData);
    
        // Redirect back to the team index page with a success message
        return redirect()->route('team.index')->with('success', 'Team details have been updated.');
    }
    
    

    public function destroy($id)
    {
        // Find the booking record by ID
        $expert_teams = ExpertTeam::findOrFail($id);

        // Delete the record
        $expert_teams->delete();

        return redirect()->route('team.index')->with('success', 'Team has been deleted.');
    }

    public function indexApi()
    {
        $expert_teams = ExpertTeam::all();

        return response()->json($expert_teams);
    }
}

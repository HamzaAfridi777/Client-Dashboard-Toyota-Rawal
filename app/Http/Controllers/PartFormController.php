<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PartFormSubmission;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\PartFormNotification;

class PartFormController extends Controller
{

    public function index()
    {
        $submissions = PartFormSubmission::all();
        return Inertia::render('Parts/PartFormSubmissionsList', [
            'submissions' => $submissions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:500',
            'quantity' => 'required|integer|min:1',
            'part_id' => 'required|integer|exists:parts,id',
        ]);

        PartFormSubmission::create($validated);
        // Send notification email
        Mail::to($validated['email'])->send(new PartFormNotification($validated));

        return response()->json(['message' => 'Form submitted successfully'], 200);
    }


    public function destroy($id)
    {
        $submission = PartFormSubmission::findOrFail($id);
        $submission->delete();

        return redirect()->route('part-form-submissions.index')
            ->with('success', 'Form submission deleted successfully');
    }
}

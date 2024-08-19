<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use App\Mail\ContactUsMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\AdminContactUsNotification;
use Inertia\Inertia;
class ContactUsController extends Controller
{
    public function index()
    {
        $contactUsEntries = ContactUs::all();

        return inertia('CustomerRelations/ContactUsList', ['contactUsEntries' => $contactUsEntries]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'query_type' => 'required|string|max:255',
            'message' => 'nullable|string',
        ]);

        try {
            // Create the contact us entry
            $contactUsEntry = ContactUs::create($validatedData);

            // Send the email notification
            Mail::to($validatedData['email'])->send(new ContactUsMail($validatedData));

            return response()->json(['message' => 'Contact Us submitted successfully'], 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to send contact us email: '.$e->getMessage());

            return response()->json(['message' => 'Failed to submit contact us'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $contactUsEntry = ContactUs::findOrFail($id);
            $contactUsEntry->delete();

            return redirect()->route('contactUs.index')
                ->with('success', 'Contact Us entry deleted successfully');
        } catch (\Exception $e) {
            Log::error('Failed to delete contact us entry: ' . $e->getMessage());

            return redirect()->route('contactUs.index')
                ->with('error', 'Failed to delete contact us entry');
        }
    }
    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            Mail::to($request->email)->send(new AdminContactUsNotification($request->subject, $request->message));
            
            return Inertia::render('SuccessPage', [
                'message' => 'Email sent successfully',
            ]);
        } catch (\Exception $e) {
            return Inertia::render('ErrorPage', [
                'error' => 'Failed to send email: ' . $e->getMessage(),
            ]);
        }
    }
}

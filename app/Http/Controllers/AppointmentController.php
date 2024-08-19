<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Mail\AppointmentNotification;
use Illuminate\Support\Facades\Mail;
use App\Mail\AdminAppointmentNotification;
use Inertia\Inertia;
class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'subject' => 'required|string|max:255',
            'appointment_date' => 'required|date',
            'registration_number' => 'required|string|max:255',
            'message' => 'nullable|string',
        ]);
    Appointment::create($validatedData);

    Mail::to($validatedData['email'])->send(new AppointmentNotification($validatedData));
       return response()->json(['message' => 'Appointment submitted successfully'], 201);
    }

    public function index()
    {
        $appointments = Appointment::all();

        return inertia('CustomerRelations/AppointmentList', ['appointments' => $appointments]);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return redirect()->route('appointments.index')
                         ->with('success', 'Appointment deleted successfully');
    }
    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
    
        try {
            Mail::to($request->email)->send(new AdminAppointmentNotification($request->subject, $request->message));
            
            // Instead of a plain JSON response, return an Inertia response
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


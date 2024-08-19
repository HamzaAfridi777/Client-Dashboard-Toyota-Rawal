<?php

namespace App\Http\Controllers;

use App\Models\CarBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarBookingController extends Controller
{
    public function index()
    {
        $bookings = CarBooking::all(); // Fetch all booking records (to handle as an array)

        return Inertia::render('Home/CarBookingList', [
            'bookings' => $bookings,
        ]);
    }
    public function create()
    {
        return Inertia::render('Home/Create'); // Adjust path as needed
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'note1' => 'nullable|string',
            'note2' => 'nullable|string',
            'note3' => 'nullable|string',
            'note4' => 'nullable|string',
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
        ]);

       // Handle file upload
    if ($request->hasFile('image1')) {
        $image = $request->file('image1');
        $originalName = $image->getClientOriginalName();
        $image->storeAs('public/uploads/car_booking', $originalName);
        $validatedData['image1'] = $originalName;
    }

    if ($request->hasFile('image2')) {
        $image = $request->file('image2');
        $originalName = $image->getClientOriginalName();
        $image->storeAs('public/uploads/car_booking', $originalName);
        $validatedData['image2'] = $originalName;
    }

        // Update or create the record
        CarBooking::updateOrCreate(['id' => 1], $validatedData);

        return redirect()->route('car-bookings.index')->with('success', 'Car Booking details have been updated.');
    }

    public function edit($id)
    {
        // Find the booking record by ID
        $carBooking = CarBooking::findOrFail($id);

        return Inertia::render('Home/Edit', [
            'carBooking' => $carBooking,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'note1' => 'nullable|string',
            'note2' => 'nullable|string',
            'note3' => 'nullable|string',
            'note4' => 'nullable|string',
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
        ]);
    
        // Find the booking record by ID
        $carBooking = CarBooking::findOrFail($id);
    
        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/car_booking', $originalName);
            $validatedData['image1'] = $originalName;
        } else {
            $validatedData['image1'] = $carBooking->image1;
        }
    
        if ($request->hasFile('image2')) {
            $image = $request->file('image2');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/car_booking', $originalName);
            $validatedData['image2'] = $originalName;
        } else {
            $validatedData['image2'] = $carBooking->image2;
        }
    
        // Update the record
        $carBooking->update($validatedData);
    
        return redirect()->route('car-bookings.index')->with('success', 'Car Booking details have been updated.');
    }
    

    public function destroy($id)
    {
        // Find the booking record by ID
        $carBooking = CarBooking::findOrFail($id);

        // Delete the record
        $carBooking->delete();

        return redirect()->route('car-bookings.index')->with('success', 'Car Booking has been deleted.');
    }

    public function indexApi()
    {
        $carBooking = CarBooking::all();

        return response()->json($carBooking);
    }
}

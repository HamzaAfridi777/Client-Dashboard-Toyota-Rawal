<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CarCareTip;
use Inertia\Inertia;

class CarCareTipsController extends Controller
{
    public function index()
    {
        $car_care_tips = CarCareTip::all(); // Fetch all CarCareTip records

        return Inertia::render('CareTips/Index', [
            'car_care_tips' => $car_care_tips,
        ]);
    }

    public function create()
    {
        return Inertia::render('CareTips/Create'); // Adjust path as needed
    }

    // public function store(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'tips' => 'array',
    //         'tips.*.heading' => 'nullable|string',
    //         'tips.*.addpoint' => 'nullable|string',
    //         'heading' => 'nullable|string',
    //         'description' => 'nullable|string',
    //         'imagetitle1' => 'nullable|string',
    //         'imagedescription1' => 'nullable|string',
    //         'imageshare1' => 'nullable|string',
    //         'imagecomment1' => 'nullable|string',
    //         'imagetitle2' => 'nullable|string',
    //         'imagedescription2' => 'nullable|string',
    //         'imageshare2' => 'nullable|string',
    //         'imagecomment2' => 'nullable|string',
    //         'image1' => 'nullable|image',
    //         'image2' => 'nullable|image',
    //     ]);

    //     // Handle file upload
    //     if ($request->hasFile('image1')) {
    //         $image = $request->file('image1');
    //         $originalName = $image->getClientOriginalName();
    //         $image->storeAs('public/uploads/CareTips', $originalName);
    //         $validatedData['image1'] = $originalName;
    //     }

    //     if ($request->hasFile('image2')) {
    //         $image = $request->file('image2');
    //         $originalName = $image->getClientOriginalName();
    //         $image->storeAs('public/uploads/CareTips', $originalName);
    //         $validatedData['image2'] = $originalName;
    //     }

    //     // Create the CarCareTip record
    //     $carCareTip = CarCareTip::create($validatedData);

    //     // Handle the dynamic tips
    //     if (!empty($validatedData['tips'])) {
    //         foreach ($validatedData['tips'] as $tip) {
    //             $carCareTip->tips()->create([
    //                 'heading' => $tip['heading'] ?? null,
    //                 'addpoint' => $tip['addpoint'] ?? null,
    //             ]);
    //         }
    //     }

    //     return redirect()->route('car_care.index')->with('success', 'Car Care Tips have been created.');
    // }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tips' => 'array',
            'tips.*.heading' => 'nullable|string',
            'tips.*.addpoint' => 'nullable|string',
            'heading' => 'nullable|string',
            'description' => 'nullable|string',
            'imagetitle1' => 'nullable|string',
            'imagedescription1' => 'nullable|string',
            'imageshare1' => 'nullable|string',
            'imagecomment1' => 'nullable|string',
            'imagetitle2' => 'nullable|string',
            'imagedescription2' => 'nullable|string',
            'imageshare2' => 'nullable|string',
            'imagecomment2' => 'nullable|string',
            'image1' => 'nullable|image',
            'image2' => 'nullable|image',
        ]);
    
        // Handle file upload
        if ($request->hasFile('image1')) {
            $image = $request->file('image1');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/CareTips', $originalName);
            $validatedData['image1'] = $originalName;
        }
    
        if ($request->hasFile('image2')) {
            $image = $request->file('image2');
            $originalName = $image->getClientOriginalName();
            $image->storeAs('public/uploads/CareTips', $originalName);
            $validatedData['image2'] = $originalName;
        }
    
        // Create the CarCareTip record
       // $car_care_tips = CarCareTip::create($validatedData);
        CarCareTip::updateOrCreate(['id' => 1], $validatedData);
        return redirect()->route('car_care.index')->with('success', 'Car Care Tips have been created.');
    }
    public function edit($id)
    {
        // Find the CarCareTip record by ID
      //  $car_care_tips = CarCareTip::with('tips')->findOrFail($id);
        $car_care_tips = CarCareTip::findOrFail($id);
       
        return Inertia::render('CareTips/Edit', [
            'car_care_tips' => $car_care_tips,
        ]);
    }

    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'tips' => 'array',
        'tips.*.heading' => 'nullable|string',
        'tips.*.addpoint' => 'nullable|string',
        'heading' => 'nullable|string',
        'description' => 'nullable|string',
        'imagetitle1' => 'nullable|string',
        'imagedescription1' => 'nullable|string',
        'imageshare1' => 'nullable|string',
        'imagecomment1' => 'nullable|string',
        'imagetitle2' => 'nullable|string',
        'imagedescription2' => 'nullable|string',
        'imageshare2' => 'nullable|string',
        'imagecomment2' => 'nullable|string',
        'image1' => 'nullable|image',
        'image2' => 'nullable|image',
    ]);

    // Find the CarCareTip record by ID
    $carCareTip = CarCareTip::findOrFail($id);

    // Handle file upload
    if ($request->hasFile('image1')) {
        $image = $request->file('image1');
        $originalName = $image->getClientOriginalName();
        $image->storeAs('public/uploads/CareTips', $originalName);
        $validatedData['image1'] = $originalName;
    } else {
        $validatedData['image1'] = $carCareTip->image1;
    }

    if ($request->hasFile('image2')) {
        $image = $request->file('image2');
        $originalName = $image->getClientOriginalName();
        $image->storeAs('public/uploads/CareTips', $originalName);
        $validatedData['image2'] = $originalName;
    } else {
        $validatedData['image2'] = $carCareTip->image2;
    }

    // Update the tips array directly
    if (!empty($validatedData['tips'])) {
        $validatedData['tips'] = array_map(function ($tip) {
            return [
                'heading' => $tip['heading'] ?? null,
                'addpoint' => $tip['addpoint'] ?? null,
            ];
        }, $validatedData['tips']);
    } else {
        $validatedData['tips'] = [];
    }

    // Update the CarCareTip record
    $carCareTip->update($validatedData);

    return redirect()->route('car_care.index')->with('success', 'Car Care Tips have been updated.');
}

    public function destroy($id)
    {
        // Find the CarCareTip record by ID
        $car_care_tips = CarCareTip::findOrFail($id);

        // Delete the record
        $car_care_tips->delete();

        return redirect()->route('car_care.index')->with('success', 'Car Care Tip has been deleted.');
    }

    public function indexApi()
    {
        $car_care_tips = CarCareTip::all();

        return response()->json($car_care_tips);
       
}
}
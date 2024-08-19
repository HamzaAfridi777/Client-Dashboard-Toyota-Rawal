<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\NewArrival;
use App\Models\InteriorDetail;
use App\Models\ExteriorDetail;
use App\Models\PerformanceDetail;
use App\Models\SafetyDetail;
use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NewArrivalController extends Controller
{
    public function index(Request $request)
    {
        $newArrivals = NewArrival::with(['category', 'interiorDetails', 'exteriorDetails', 'performanceDetails', 'safetyDetails'])->get();

        if ($request->expectsJson()) {
            return response()->json($newArrivals);
        }
        return Inertia::render('Vehicles/NewArrivalsIndex', ['newArrivals' => $newArrivals]);
    }

    public function create()
    {
        $categories = Category::get();
        return Inertia::render('Vehicles/NewArrivals', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'car_name' => 'required|string|max:255',
            'category_id' => 'required|string|max:255',
            'car_price' => 'required|numeric',
            'car_type' => 'required|string|max:255',
            'car_type_description' => 'required|string',
            'car_card_image' => 'nullable|image',
            'car_hero_image' => 'nullable|image',
            'categories_car_images.*' => 'nullable|image',

            'interior_details' => 'nullable|array',
            'interior_details.*.title' => 'required|string|max:255',
            'interior_details.*.details' => 'required|string',
            'interior_details.*.image' => 'nullable|image',

            'exterior_details' => 'nullable|array',
            'exterior_details.*.title' => 'required|string|max:255',
            'exterior_details.*.details' => 'required|string',
            'exterior_details.*.image' => 'nullable|image',

            'performance_details' => 'nullable|array',
            'performance_details.*.title' => 'required|string|max:255',
            'performance_details.*.details' => 'required|string',
            'performance_details.*.image' => 'nullable|image',

            'safety_details' => 'nullable|array',
            'safety_details.*.title' => 'required|string|max:255',
            'safety_details.*.details' => 'required|string',
            'safety_details.*.image' => 'nullable|image',
        ]);

        // Handle single file uploads
        foreach (['car_card_image', 'car_hero_image'] as $field) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->storeAs('public/uploads/new_arrivals', $fileName);
                $validatedData[$field] = $fileName;
            }
        }

        // Handle multiple file uploads
        if ($request->hasFile('categories_car_images')) {
            $files = $request->file('categories_car_images');
            $fileNames = [];

            foreach ($files as $file) {
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->storeAs('public/uploads/new_arrivals', $fileName);
                $fileNames[] = $fileName;
            }

            $validatedData['categories_car_images'] = json_encode($fileNames);
        }

        $newArrival = NewArrival::create($validatedData);

        $details = [
            'interior_details' => InteriorDetail::class,
            'exterior_details' => ExteriorDetail::class,
            'performance_details' => PerformanceDetail::class,
            'safety_details' => SafetyDetail::class,
        ];

        foreach ($details as $detailType => $model) {
            if (isset($validatedData[$detailType])) {
                foreach ($validatedData[$detailType] as $detail) {
                    $data = [
                        'new_arrival_id' => $newArrival->id,
                        'title' => $detail['title'],
                        'details' => $detail['details'],
                    ];

                    if (isset($detail['image'])) {
                        $file = $detail['image'];
                        $fileName = time() . '-' . $file->getClientOriginalName();
                        $file->storeAs('public/uploads/new_arrivals', $fileName);
                        $data['image'] = $fileName;
                    }

                    $model::create($data);
                }
            }
        }

        // Handle hero image
        if ($request->hasFile('car_hero_image')) {
            $heroData = [
                'new_arrival_id' => $newArrival->id,
                'car_hero_image' => $validatedData['car_hero_image'],
            ];

            Hero::create($heroData);
        }

        return redirect()->route('new-arrivals.index');
    }

    public function edit($id)
    {
        $newArrival = NewArrival::with(['interiorDetails', 'exteriorDetails', 'performanceDetails', 'safetyDetails', 'category'])->findOrFail($id);
        $categories = Category::get();
        return Inertia::render('Vehicles/NewArrivalsEdit', [
            'newArrival' => $newArrival,
            'categories' => $categories
        ]);
    }


    public function update(Request $request)
    {
        //   dd($request->all());
        $validatedData = $request->validate([
            'car_name' => 'required|string|max:255',
            'category_id' => 'required|string|max:255',
            'car_price' => 'required|numeric',
            'car_type' => 'required|string|max:255',
            'car_type_description' => 'required|string',
            'car_card_image' => 'nullable|image',
            'car_hero_image' => 'nullable|image',
            'categories_car_images.*' => 'nullable|image',

            'interior_details' => 'nullable|array',
            'interior_details.*.title' => 'required|string|max:255',
            'interior_details.*.details' => 'required|string',
            'interior_details.*.image' => 'nullable|image',

            'exterior_details' => 'nullable|array',
            'exterior_details.*.title' => 'required|string|max:255',
            'exterior_details.*.details' => 'required|string',
            'exterior_details.*.image' => 'nullable|image',

            'performance_details' => 'nullable|array',
            'performance_details.*.title' => 'required|string|max:255',
            'performance_details.*.details' => 'required|string',
            'performance_details.*.image' => 'nullable|image',

            'safety_details' => 'nullable|array',
            'safety_details.*.title' => 'required|string|max:255',
            'safety_details.*.details' => 'required|string',
            'safety_details.*.image' => 'nullable|image',
        ]);
        // $validatedData = $request->validate();

        $newArrival = NewArrival::findOrFail($request->only('id'));

        if ($request->hasFile('car_card_image') || $request->hasFile('car_hero_image')) {
            $newArrival = NewArrival::where('id', $request->input('id'))->first();

            foreach (['car_card_image', 'car_hero_image'] as $field) {
                if ($request->hasFile($field)) {
                    $file = $request->file($field);
                    $fileName = time() . '-' . $file->getClientOriginalName();
                    $file->storeAs('public/uploads/new_arrivals', $fileName);

                    $validatedData[$field] = $fileName;
                } else {
                    // Keep existing image if not updated
                    $validatedData[$field] = $newArrival->$field;
                }
            }

            $newArrival->update($validatedData);
        }
        // Handle multiple file uploads
        if ($request->hasFile('categories_car_images')) {
            $files = $request->file('categories_car_images');
            $fileNames = [];

            foreach ($files as $file) {
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->storeAs('public/uploads/new_arrivals', $fileName);
                $fileNames[] = $fileName;
            }

            $validatedData['categories_car_images'] = json_encode($fileNames);
        } else {
            // Ensure this only runs if categories_car_images already exists in the model
    if ($newArrival && isset($newArrival->categories_car_images)) {
            $validatedData['categories_car_images'] = $newArrival->categories_car_images; // Keep existing images if not updated
        }
    }
        $newArrival = NewArrival::where('id', $request->input('id'))->first();
         // Handle dynamic details (interior, exterior, etc.)
    $details = [
        'interior_details' => InteriorDetail::class,
        'exterior_details' => ExteriorDetail::class,
        'performance_details' => PerformanceDetail::class,
        'safety_details' => SafetyDetail::class,
    ];

    foreach ($details as $detailType => $model) {
        if ($request->has($detailType)) {
            // Iterate over the details
            foreach ($request->input($detailType) as $index => $detail) {
                $existingDetail = $model::where('new_arrival_id', $newArrival->id)
                    ->where('title', $detail['title'])
                    ->first();

                if ($existingDetail) {
                    $data = [
                        'title' => $detail['title'],
                        'details' => $detail['details'],
                    ];

                    // Check if an image is updated
                    if ($request->hasFile("{$detailType}.{$index}.image")) {
                        $file = $request->file("{$detailType}.{$index}.image");
                        $fileName = time() . '-' . $file->getClientOriginalName();
                        $file->storeAs('public/uploads/new_arrivals', $fileName);
                        $data['image'] = $fileName;
                    } else {
                        $data['image'] = $existingDetail->image;
                    }

                    // Update the existing record
                    $existingDetail->update($data);
                } else {
                    $data = [
                        'new_arrival_id' => $newArrival->id,
                        'title' => $detail['title'],
                        'details' => $detail['details'],
                    ];

                    if ($request->hasFile("{$detailType}.{$index}.image")) {
                        $file = $request->file("{$detailType}.{$index}.image");
                        $fileName = time() . '-' . $file->getClientOriginalName();
                        $file->storeAs('public/uploads/new_arrivals', $fileName);
                        $data['image'] = $fileName;
                    } else {
                        $data['image'] = $detail['image'] ?? null;
                    }

                    // Save the detail data to the respective model
                    $model::create($data);
                }
            }}}

        // Handle Hero image update
        if ($request->hasFile('car_hero_image')) {
            $file = $request->file('car_hero_image');
            $fileName = time() . '-' . Str::slug($file->getClientOriginalName(), '-');
            $file->storeAs('public/uploads/new_arrivals', $fileName);

            // Prepare data to be updated or created
            $heroData = [
                'new_arrival_id' => $newArrival->id,
                'car_hero_image' =>  $fileName, // Store only the image name
            ];

            Hero::updateOrCreate(
                ['new_arrival_id' => $newArrival->id],
                $heroData
            );
        } else {
            // If no new image is uploaded, just ensure the record exists without changing the image
            Hero::updateOrCreate(
                ['new_arrival_id' => $newArrival->id]
            );
        }
        $newArrival->update($validatedData);

        return redirect()->route('new-arrivals.index');
    }

    public function destroy($id)
    {
        $newArrival = NewArrival::findOrFail($id);
        $newArrival->delete();

        return redirect()->route('new-arrivals.index');
    }

    public function getHeroImages()
    {
        $heroes = Hero::all();
        return response()->json($heroes);
    }
}

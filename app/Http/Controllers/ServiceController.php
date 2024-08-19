<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('serviceCategory')->get();
        // dd($services);
        return Inertia::render('Services/Index', ['services' => $services]);
    }

    public function create()
    {
        $serviceCategories = ServiceCategory::all();
        return Inertia::render('Services/Create', compact('serviceCategories'));
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image',
            'description' => 'required|string',
            'service_category_id' => 'required|exists:service_categories,id',
        ]);

        // Initialize a new Service model instance with validated data
        // $service = new Service($request->only(['name', 'description', 'service_category_id']));
        $service = new Service($request->all());
        // Handle the image file if it exists in the request
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $file->storeAs('public/uploads/services', $fileName);
            $service->image = $fileName;
        }

        $service->save();

        // Redirect to the services index route
        return redirect()->route('services.index');
    }


    public function edit(Service $service)
    {
        $serviceCategories = ServiceCategory::all();
        return Inertia::render('Services/Edit', [
            'service' => $service,
            'serviceCategories' => $serviceCategories
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image',
            'description' => 'required|string',
            'service_category_id' => 'required|exists:service_categories,id',
        ]);

        $serviceData = Service::where('id', $service->id)->first();
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $file->storeAs('public/uploads/services', $fileName);
            $serviceData->image = $fileName;
        }
        // echo "<pre>";
        // print_r($service);
        // die();
        
        $serviceData->service_category_id = $service->service_category_id;
        $serviceData->name = $service->name;
        $serviceData->description = $service->description;
        $serviceData->save();
        
        // $service->update($request->all());

        return redirect()->route('services.index');
    }
    
    // public function update(Request $request, Service $service)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'image' => 'nullable|image',
    //         'description' => 'required|string',
    //         'service_category_id' => 'required|exists:service_categories,id',
    //     ]);

    //     if ($request->hasFile('image')) {
    //         $file = $request->file('image');
    //         $fileName = time() . '-' . $file->getClientOriginalName();
    //         $file->storeAs('public/uploads/services', $fileName);
    //         $service->image = $fileName;
    //     }

    //     $service->update($request->all());

    //     return redirect()->route('services.index');
    // }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('services.index');
    }

    public function getAllServices()
    {
        $services = Service::with('serviceCategory')->get();

        return response()->json([
            'message' => true,
            'status' => 200,
            'data' =>  $services
        ]);
    }
}

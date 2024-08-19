<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function index()
     {
        $serviceCategories = ServiceCategory::all();
        return Inertia::render('ServiceCategories/Index', ['serviceCategories' => $serviceCategories]);
    }

    public function create()
    {
        return Inertia::render('ServiceCategories/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        ServiceCategory::create($request->all());
        return redirect()->route('service-categories.index');
    }

    public function edit(ServiceCategory $serviceCategory)
    {
        return Inertia::render('ServiceCategories/Edit', ['serviceCategory' => $serviceCategory]);
    }

    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $serviceCategory->update($request->all());
        return redirect()->route('service-categories.index');
    }

    public function destroy(ServiceCategory $serviceCategory)
    {
        $serviceCategory->delete();
        return redirect()->route('service-categories.index');
    }
}
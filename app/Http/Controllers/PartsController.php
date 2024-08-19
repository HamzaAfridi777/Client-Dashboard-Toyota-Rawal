<?php
namespace App\Http\Controllers;

use App\Models\Parts;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PartsController extends Controller
{
    public function index()
    {
        $parts = Parts::all();
        return Inertia::render('Parts/Index', ['parts' => $parts]);
    }

    public function create()
    {
        return Inertia::render('Parts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'car_price' => 'required|numeric',
            'part_image' => 'required|image',
        ]);

        $part = new Parts();
        $part->name = $request->input('name');
     // Remove commas from formatted price for backend storage
     $part->car_price = str_replace(',', '', $request->input('car_price'));

        if ($request->hasFile('part_image')) {
            $file = $request->file('part_image');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $file->storeAs('public/uploads/parts', $fileName);
            $part->part_image = $fileName;
        }

        $part->save();

        return redirect()->route('parts.index');
    }

    public function edit($id)
    {
        $part = Parts::findOrFail($id);
        return Inertia::render('Parts/Edit', ['part' => $part]);
    }

    public function update(Request $request, $id)
    {
        $part = Parts::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'car_price' => 'required|numeric',
            'part_image' => 'image|nullable',
        ]);

        $part->name = $request->input('name');
       // Remove commas from formatted price for backend storage
       $part->car_price = str_replace(',', '', $request->input('car_price'));

        if ($request->hasFile('part_image')) {
            if ($part->part_image) {
                Storage::delete('public/uploads/parts/' . $part->part_image);
            }

            $file = $request->file('part_image');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $file->storeAs('public/uploads/parts', $fileName);
            $part->part_image = $fileName;
        }

        $part->save();

        
        return redirect()->route('parts.index');
    }

    public function destroy($id)
    {
        $part = Parts::findOrFail($id);

        if ($part->part_image) {
            Storage::delete('public/uploads/parts/' . $part->part_image);
        }

        $part->delete();

        return redirect()->route('parts.index');
    }
    public function indexApi()
    {
        $parts = Parts::all();

        return response()->json($parts);
    }
}

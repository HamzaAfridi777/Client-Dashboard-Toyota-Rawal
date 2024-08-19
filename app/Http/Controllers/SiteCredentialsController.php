<?php

namespace App\Http\Controllers;

use App\Models\SiteCredentials;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SiteCredentialsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $siteCredentials = SiteCredentials::all();

        
        // print_r($siteCredentials);
        // die();
        if ($request->expectsJson()) {
            return response()->json($siteCredentials);
        }
        return Inertia::render('Master/SideCredentials', ['siteCredentials' => $siteCredentials]);
        
    }
   
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
          return Inertia::render('Master/SideCredentials');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'customer_relation_number' => 'required|string|max:255',
            'site_title' => 'required|string|max:255',
            'facebook_link' => 'nullable|url|max:255',
            'twitter_link' => 'nullable|url|max:255',
            'instagram_link' => 'nullable|url|max:255',
            'linkedin_link' => 'nullable|url|max:255',
            'whatsapp_number' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'site_logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
           // 'hero_images' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        // Check if an image is uploaded
        if ($request->hasFile('site_logo')) {
            // Get the uploaded file
            $file = $request->file('site_logo');
            // Get the original file name
            $fileName = time() . '-' . $file->getClientOriginalName();
            // Store the file in the specified folder and use the original file name
            $file->storeAs('public/uploads/site_logos', $fileName);
            // Add the file name to the validated data
            $validatedData['site_logo'] = $fileName;
        }
    
        // Store the data
        SiteCredentials::create($validatedData);
    
        // Redirect back with success message
        return redirect()->route('site-credentials.index')->with('success', 'Site credentials added successfully');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(SiteCredentials $siteCredentials)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SiteCredentials $siteCredentials)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SiteCredentials $siteCredentials)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SiteCredentials $siteCredentials)
    {
        //
    }
}

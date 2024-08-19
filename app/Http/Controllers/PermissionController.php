<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
class PermissionController extends Controller

{
    public function index()
    {
        $permissions = Permission::all();
        return inertia('Permissions/PermissionsList', ['permissions' => $permissions]);
    }

    public function create()
    {
        return inertia('Permissions/AddPermission');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
        $permission = new Permission;
        $permission->name = $request->name;
        $permission->save();

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    public function show($id)
    {
        $permission = Permission::find($id);
        return inertia('Permissions/Show', ['permission' => $permission]);
    }

    public function edit($id)
    {
        $permission = Permission::find($id);
        return inertia('Permissions/Edit', ['permission' => $permission]);
    }

    public function update(Request $request, $id)
{
    // Validate the request data
    $request->validate([
        'name' => 'required|string',
    ]);

    // Find the Permission by ID
    $permission = Permission::find($id);

    if ($permission) {
        // Update the Permission's name
        $permission->name = $request->name;
        $permission->save();

        // Redirect with success message
        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
    } else {
        // Redirect with error message if role not found
        return redirect()->route('permissions.index')->with('error', 'Permission not found.');
    }
}
    public function destroy($id)
    {
        $permission = Permission::where('id',$id)->delete();
        if($permission){
          return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');  
        }else{
            return redirect()->route('permissions.index')->with('error', 'something went wrong.');
        }
        
    }

}

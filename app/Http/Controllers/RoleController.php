<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return inertia('Roles/RolesList', ['roles' => $roles]);
    }

    public function create()
    {
        return inertia('Roles/AddRole');
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'name' => 'required|string',
        ]);
        $role = new Role;
        $role->name = $request->name;
        $role->save();

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function show($id)
    {
        $role = Role::find($id);
        return inertia('Roles/Show', ['role' => $role]);
    }

    public function edit($id)
    {
        $role = Role::find($id);
        return inertia('Roles/Edit', ['role' => $role]);
    }

    public function update(Request $request, $id)
{
    // Validate the request data
    $request->validate([
        'name' => 'required|string',
    ]);

    // Find the role by ID
    $role = Role::find($id);

    if ($role) {
        // Update the role's name
        $role->name = $request->name;
        $role->save();

        // Redirect with success message
        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    } else {
        // Redirect with error message if role not found
        return redirect()->route('roles.index')->with('error', 'Role not found.');
    }
}
    public function destroy($id)
    {
        $role = Role::where('id',$id)->delete();
        if($role){
          return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');  
        }else{
            return redirect()->route('roles.index')->with('error', 'something went wrong.');
        }
        
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with( 'roles.permissions',)->get();
        return Inertia::render('Users/UsersList', ['users' => $users]);
    }

    public function create()
    {
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Users/AddUser', ['roles' => $roles, 'permissions' => $permissions]);
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role_id' => 'required|exists:roles,id',
        'permissions' => 'sometimes|array',
        'permissions.*' => 'exists:permissions,id', // Validate each permission ID
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    $user->roles()->attach($request->role_id);

    if ($request->has('permissions')) {
        $role = Role::find($request->role_id);
        $role->permissions()->sync($request->permissions);
    }

    return redirect()->route('users.index')->with('success', 'User created successfully.');
}

    public function edit($id)
    {
        $user = User::with('roles.permissions')->find($id);
        $roles = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
    
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }
    

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
            'permissions' => 'sometimes|array',
            'permissions.*' => 'exists:permissions,id', // Validate each permission ID
        ]);
    
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
    
        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }
    
        $user->save();
    
        // Sync role
        $user->roles()->sync([$request->role_id]);
    
        // Sync permissions for the role
        if ($request->has('permissions')) {
            $role = Role::find($request->role_id);
            $role->permissions()->sync($request->permissions);
        }
    
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
    

    // public function destroy($id)
    // {
    //     $user = User::find($id);
    //     $user->delete();

    //     return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    // }
    public function destroy($id)
    {
        $user = User::find($id);
    
        if ($user) {
            // Detach the user's roles and permissions
            $user->roles()->detach();
            // If you had a direct relationship with permissions, detach those as well
            // $user->permissions()->detach();
    
            // Delete the user
            $user->delete(); // Use forceDelete() if you want to permanently delete the user
    
            return redirect()->route('users.index')->with('success', 'User deleted successfully.');
        }
    
        return redirect()->route('users.index')->with('error', 'User not found.');
    }
    

}

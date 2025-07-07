<?php

// app/Http/Controllers/AdminController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
{
    return Inertia::render('Admin/Dashboard', [
        'users' => User::select('id', 'name', 'email', 'role')->get()
    ]);
    $query = User::query();

    if ($search = $request->get('search')) {
        $query->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
    }

    if ($role = $request->get('role')) {
        $query->where('role', $role);
    }

    $users = $query->get();

    return Inertia::render('Users/Index', [
        'users' => $users,
        'filters' => $request->only(['search', 'role']),
    ]);
}

}

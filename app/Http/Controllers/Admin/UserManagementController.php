<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Degree;
use App\Models\Major;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UserApproved;
use App\Notifications\UserRejected;

class UserManagementController extends Controller
{
    public function index(Request $request): Response
    {
    $query = User::query()
        ->where('status', 'approved')
        ->with('alumni');

    if ($request->search) {
        $query->where(function ($q) use ($request) {
            $q->where('name', 'ilike', '%' . $request->search . '%')
                ->orWhere('email', 'ilike', '%' . $request->search . '%');
        });
    }

    if ($request->role) {
        $query->where('role', $request->role);
    }

    $query->orderBy(
        $request->get('sort', 'created_at'),
        $request->get('direction', 'desc')
    );

    $users = $query->paginate(10)->withQueryString();

    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
        'filters' => $request->only(['search', 'role', 'sort', 'direction']), // ✅ Important!
    ]);
    }

    public function pending()
    {
        $pendingUsers = User::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Users/Pending', [
            'users' => $pendingUsers,
            'filters' => request()->only(['search', 'sort', 'direction']),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $hasAdmin = User::where('role', 'admin')->exists();

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'graduation_year' => 'nullable|integer|min:1900|max:' . now()->year,
            'degree_id' => 'nullable|exists:degrees,id', // Must exist in the degrees table
            'major_id' => 'nullable|exists:majors,id', // Must exist in the majors table
            'program_id' => 'nullable|exists:programs,id', // Must exist in the programs table
            'bio' => 'nullable|string|max:1000',
            'phone_number' => 'nullable|string|max:15', // Adjust validation as per phone number format
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // Optional avatar image
        ]);

        $role = $request->role === 'admin' && !$hasAdmin ? 'admin' : 'alumni';

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $role,
            'password' => bcrypt($request->password),
            'status' => 'approved',
        ]);

        if ($role === 'alumni') {
            $user->alumni()->create([
                'graduation_year' => $request->graduation_year,
                'degree_id' => $request->degree_id,
                'major_id' => $request->major_id,
                'program_id' => $request->program_id,
                'bio' => $request->bio,
                'phone_number' => $request->phone_number,
                'avatar' => $request->avatar ? $request->file('avatar')->store('avatars', 'public') : null,
            ]);
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user): Response
    {
        // Load the alumni data
        $user->load('alumni');

        // Fetch available degrees, majors, and programs
        $degrees = Degree::all();
        $majors = Major::where('degree_id', $user->alumni->degree_id)->get();
        $programs = Program::where('major_id', $user->alumni->major_id)->get();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'degrees' => $degrees,
            'majors' => $majors,
            'programs' => $programs,
        ]);
    }


    public function update(Request $request, User $user)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'graduation_year' => 'nullable|integer|min:1900|max:' . now()->year,
        'degree_id' => 'nullable|exists:degrees,id',
        'major_id' => 'nullable|exists:majors,id',
        'program_id' => 'nullable|exists:programs,id',
        'bio' => 'nullable|string|max:1000',
        'phone_number' => 'nullable|string|max:15',
        'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);

    // Update the user basic information
    $user->update($request->only('name', 'email'));

    if ($user->role === 'alumni' && $user->alumni) {
        $alumniUpdateData = [
            'graduation_year' => $request->graduation_year,
            'degree_id' => $request->degree_id,
            'major_id' => $request->major_id,
            'program_id' => $request->program_id,
            'bio' => $request->bio,
            'phone_number' => $request->phone_number,
        ];

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $alumniUpdateData['avatar'] = $avatarPath;
        }

        $user->alumni()->update($alumniUpdateData);
    }

    return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
}


    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
    public function approve(User $user)
    {
        if ($user->status !== 'pending') {
            return back()->with('error', 'User is already processed.');
        }

        DB::beginTransaction();

        try {
            $user->update(['status' => 'approved']);
            DB::commit();
            // Notification::route('mail', $user->email)->notify(new UserApproved($user->name));

            return back()->with('success', 'User approved successfully.');
        }catch (\Exception $exception){
            DB::rollBack();
            return back()->with('error', 'Error approving the user. Please try again.');
        }


    }

    public function reject(User $user)
    {
        if ($user->status !== 'pending') {
            return back()->with('error', 'User is already processed.');
        }

        DB::beginTransaction();

        try {
            // Save email before deleting
            $email = $user->email;
            $name = $user->name;

            // Delete user and related alumni profile
            $user->alumni()->delete();
            $user->delete();

            // Commit transaction
            DB::commit();

            // Notify user to re-register
            // Notification::route('mail', $email)->notify(new UserRejected($name));

            return back()->with('success', 'User rejected and deleted. They have been notified.');
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback if any exception occurs
            return back()->with('error', 'Error rejecting the user. Please try again.');
        }
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            // Alumni profile fields
            'graduation_year' => 'required|digits:4|integer',
            'bio' => 'nullable|string|max:1000',
            'degree_id' => 'required|exists:degrees,id',
            'major_id' => 'required|exists:majors,id',
            'program_id' => 'required|exists:programs,id',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 'pending',
            'role' => User::ROLE_ALUMNI,
        ]);

        $user->alumni()->create([
            'graduation_year' => $request->graduation_year,
            'bio' => $request->bio,
            'degree_id' => $request->degree_id,
            'major_id' => $request->major_id,
            'program_id' => $request->program_id,
            'phone_number' => $request->phone_number,
        ]);

        event(new Registered($user));

//        Auth::login($user);

//        return redirect(route('dashboard', absolute: false));
        return redirect()->route('login')->with('message', 'Registration submitted. Please wait for admin approval.');
    }
}

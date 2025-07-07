<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\Degree;
use App\Models\Major;
use App\Models\Program;
// web.php

Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        Route::resource('users', UserManagementController::class)->except(['show']);
        Route::get('/users/pending', [UserManagementController::class, 'pending'])->name('users.pending');
        Route::post('users/{user}/approve', [UserManagementController::class, 'approve'])->name('users.approve');
        Route::post('users/{user}/reject', [UserManagementController::class, 'reject'])->name('users.reject');
    });


Route::get('/degrees', function () {
    return Degree::all();
});

Route::get('/majors/{degree_id}', function ($degree_id) {
    return Major::where('degree_id', $degree_id)->get();
});

Route::get('/programs/{major_id}', function ($major_id) {
    return Program::where('major_id', $major_id)->get();
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Russian Dashboard
Route::get('/ru', function () {
    return Inertia::render('Dashboard_ru');
})->name('lang.ru');

// Kazakh Dashboard
Route::get('/kz', function () {
    return Inertia::render('Dashboard_kz');
})->name('lang.kz');

Route::get('/events', function () {
    return Inertia::render('Admin/Events');
})->name('admin.events');

Route::get('/news', function () {
    return Inertia::render('Admin/News');
})->name('admin.news');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/alumni', [\App\Http\Controllers\ProfileController::class, 'updateAlumni'])->name('profile.alumni.update');
});

require __DIR__.'/auth.php';

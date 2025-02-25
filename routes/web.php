<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');
    Route::resource('users', Controllers\UserController::class);
    Route::get('users-list-ajax', [Controllers\UserController::class, 'users_list_ajax'])->name('users.ajax_list');
    // Route::prefix('user')->controller(Controllers\UserController::class)->group(function () {
    //     Route::get('user-list', 'user_list')->name('user.list');
    // });
    //Upcoming routes will go here...

});

require __DIR__ . '/auth.php';

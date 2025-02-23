<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

Route::middleware('guest')->group(function () {
    //Signup Routes
    Route::get('register', [Controllers\AuthController::class, 'signup'])->name('register');
    Route::post('register', [Controllers\AuthController::class, 'signup_store']);

    //Login Routes
    Route::get('login', [Controllers\AuthController::class, 'login'])->name('login');
    Route::post('login', [Controllers\AuthController::class, 'login_verify'])->name('login.verify');

    //Forgot Password Routes
    Route::get('forgot-password', [Controllers\AuthController::class, 'forgot_password_request'])->name('password.request');
    Route::post('forgot-password', [Controllers\AuthController::class, 'forgot_password_email'])->middleware('throttle:6,1')->name('password.email');
    Route::get('reset-password/{token}', [Controllers\AuthController::class, 'password_reset'])->name('password.reset');
    Route::post('reset-password', [Controllers\AuthController::class, 'password_store'])->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [Controllers\AuthController::class, 'verify_email'])->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [Controllers\AuthController::class, 'verify_email_process'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [Controllers\AuthController::class, 'send_verification_notification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
    Route::get('logout', [Controllers\AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('organization', [Controllers\AuthController::class, 'organization'])->name('organization.create');
    Route::post('organization', [Controllers\AuthController::class, 'organization_store'])->name('organization.store');
});

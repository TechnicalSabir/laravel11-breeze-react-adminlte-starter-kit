<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller {

    public function signup() {
        $title = "Register";
        return Inertia::render('Auth/Register', [
            'title' => $title
        ]);
    }

    public function signup_store(Request $request) {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:30|same:password_confirmation'
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect(route('dashboard', absolute: false));
    }

    public function verify_email(Request $request) {
        // Invoked, when user's email is not verified so redirect the user on the verify-email view.
        $title = "Verify Email Address";
        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(route('dashboard', absolute: false))
            : Inertia::render('Auth/VerifyEmail', [
                'title' => $title,
                'status' => session('status')
            ]);
    }

    public function verify_email_process(Request $request) {
        // Invoked, when user attempts verify his/her mail through their generated email on his/her mail inbox. 
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false) . "?verified=1");
        }
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }
        return redirect()->intended(route('dashboard', absolute: false) . "?verified=1");
    }

    public function send_verification_notification(Request $request) {
        // Invoked, when user attempts to send verification notification
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();
        return back()->with('status', 'verification-link-sent');
    }

    public function login() {
        $title = "Login";
        return Inertia::render('Auth/Login', [
            'title' => $title
        ]);
    }

    public function login_verify(LoginRequest $request) {
        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function forgot_password_request() {
        $title = "Forgot Password";
        return Inertia::render('Auth/ForgotPassword', [
            'title' => $title,
            'status' => session('status')
        ]);
    }

    public function forgot_password_email(Request $request) {
        $validate = $request->validate([
            'email' => 'required|email',
        ]);
        $status = Password::sendResetLink($request->only('email'));
        return $status == Password::RESET_LINK_SENT
            ? back()->with('status', __($status))
            : back()->withInput($request->only('email'))->withErrors(['email' => __($status)]);
    }

    public function password_reset(Request $request) {
        $title = "Reset Password";
        return Inertia::render('Auth/ResetPassword', [
            'title' => $title,
            'token' => $request->token,
            'email' => $request->email
        ]);
    }

    public function password_store(Request $request) {
        $validate = $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:6|max:30|same:password_confirmation',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();
                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', ['success' => true, 'alert_type' => 'success', 'message' => __($status)])
            : back()->withInput($request->only('email'))->withErrors(['status' => __($status)]);
    }

    public function logout() {
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken();
        return redirect()->route('login');
    }
}

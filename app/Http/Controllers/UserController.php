<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller {
    public function index() {
        $title = "Users List";
        return Inertia::render('Users/UsersList', [
            'title' => $title
        ]);
    }

    public function users_list_ajax() {
        $users = User::select(
            'id',
            'name',
            'email',
            'id as action'
        );
        return datatables($users)->make(false);
    }

    public function show() {
        return "hello show function";
    }

    public function edit($id) {
        $title = "Edit User";
        $user = User::find($id);
        return Inertia::render('Users/UserEdit', [
            'title' => $title,
            'user' => $user,
        ]);
    }

    public function update($id, Request $request) {
        // return $request;
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,$id",
        ]);

        User::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // return back()->with('success', 'updated');
    }
}

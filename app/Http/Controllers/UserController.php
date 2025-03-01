<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

    public function create() {
        $user = new User();
        $title = "Add User";
        return Inertia::render('Users/ManageUser', [
            'status' => session('status'),
            'title' => $title,
            'userData' => ['name' => '', 'email' => ''],
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|max:30',
        ]);
        User::create($request->only('name', 'email', 'password'));

        session()->flash("status", ['success' => true, 'alert_type' => 'success', 'message' => 'User added!']);
    }

    public function edit($id) {
        $title = "Edit User";
        $user = User::select('id', 'name', 'email')->where('id', $id)->first();
        !$user ?? abort(404);
        return Inertia::render('Users/ManageUser', [
            'status' => session('status'),
            'title' => $title,
            'userData' => $user,
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

        session()->flash("status", ['success' => true, 'alert_type' => 'success', 'message' => 'User updated!']);
    }

    public function destroy($id){
        User::destroy($id);
        session()->flash("status", ['success' => true, 'alert_type' => 'success', 'message' => 'User deleted!']);

    }
}

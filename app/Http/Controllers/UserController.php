<?php

namespace App\Http\Controllers;

use App\Models\User;
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
}

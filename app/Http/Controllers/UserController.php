<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller {
    public function index(){
        return Inertia::render('User/UserList');
    }

    public function user_list_ajax(){
        $users = User::select(
            'id',
            'name',
            'email',
        );
        // return datatables()
    }
}

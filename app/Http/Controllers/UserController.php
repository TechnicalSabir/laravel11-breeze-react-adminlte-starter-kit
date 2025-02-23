<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class UserController extends Controller {
    public function user_list(){
        return Inertia::render('User/UserList');
    }
}

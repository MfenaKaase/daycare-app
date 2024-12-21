<?php

// use sanctum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\LoginController;

//  Auth Route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/authentication', [LoginController::class, 'authenticate']);
Route::post('/logout', [LoginController::class, 'logout']);

// Users
Route::resource('users', UserController::class);

// Children
Route::resource('children', ChildController::class);




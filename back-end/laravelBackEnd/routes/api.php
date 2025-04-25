<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VacationPackageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/vacationpackages', VacationPackageController::class);
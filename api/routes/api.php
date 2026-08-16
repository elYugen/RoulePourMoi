<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\VehicleBrandController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\VehicleTypeController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth.token')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth.token')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::post('avatar', [ProfileController::class, 'updateAvatar']);
    });

    Route::get('vehicle-types', [VehicleTypeController::class, 'index']);
    Route::get('vehicle-brands', [VehicleBrandController::class, 'index']);
    Route::get('vehicles', [VehicleController::class, 'index']);
    Route::post('vehicles', [VehicleController::class, 'store']);
});

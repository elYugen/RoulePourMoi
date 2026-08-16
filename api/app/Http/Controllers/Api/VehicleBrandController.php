<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleBrandResource;
use App\Models\VehicleBrand;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VehicleBrandController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return VehicleBrandResource::collection(
            VehicleBrand::query()->with('models')->orderBy('name')->get()
        );
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Resources\VehicleResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VehicleController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $vehicles = $request->user()
            ->vehicles()
            ->with(['brand', 'model', 'vehicleType'])
            ->latest()
            ->get();

        return VehicleResource::collection($vehicles);
    }

    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $vehicle = $request->user()->vehicles()->create([
            ...$request->validated(),
            'status' => 'pending',
        ]);

        return response()->json([
            'vehicle' => new VehicleResource($vehicle->load(['brand', 'model', 'vehicleType'])),
        ], 201);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'registration' => $this->registration,
            'color' => $this->color,
            'year' => $this->year,
            'fuel_type' => $this->fuel_type,
            'seats' => $this->seats,
            'status' => $this->status,
            'brand' => $this->whenLoaded('brand', fn () => [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
            ]),
            'model' => $this->whenLoaded('model', fn () => [
                'id' => $this->model->id,
                'name' => $this->model->name,
            ]),
            'vehicle_type' => $this->whenLoaded('vehicleType', fn () => [
                'id' => $this->vehicleType->id,
                'name' => $this->vehicleType->name,
                'icon' => $this->vehicleType->icon,
            ]),
            'created_at' => $this->created_at,
        ];
    }
}

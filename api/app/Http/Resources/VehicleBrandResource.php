<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleBrandResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'models' => $this->whenLoaded('models', fn () => $this->models->map(fn ($model) => [
                'id' => $model->id,
                'name' => $model->name,
            ])),
        ];
    }
}

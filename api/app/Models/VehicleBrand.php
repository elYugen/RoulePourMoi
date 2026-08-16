<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name'])]
class VehicleBrand extends Model
{
    public function models(): HasMany
    {
        return $this->hasMany(VehicleModel::class, 'brand_id');
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class, 'brand_id');
    }
}

<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Placeholder categories (name/description/max_passengers/icon) until the
     * real product list is confirmed — safe to edit or reseed at any time.
     */
    public function run(): void
    {
        $types = [
            [
                'slug' => 'standard',
                'name' => 'Standard',
                'description' => 'Véhicule confortable pour vos trajets du quotidien.',
                'max_passengers' => 4,
                'icon' => 'car-front',
            ],
            [
                'slug' => 'confort',
                'name' => 'Confort',
                'description' => 'Véhicule plus spacieux avec plus de place à bord.',
                'max_passengers' => 4,
                'icon' => 'car-front',
            ],
            [
                'slug' => 'xl',
                'name' => 'XL',
                'description' => 'Grand véhicule jusqu\'à 6 passagers.',
                'max_passengers' => 6,
                'icon' => 'car-front',
            ],
        ];

        foreach ($types as $type) {
            VehicleType::query()->updateOrCreate(['slug' => $type['slug']], $type + ['active' => true]);
        }
    }
}

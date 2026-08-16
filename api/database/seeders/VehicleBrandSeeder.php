<?php

namespace Database\Seeders;

use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class VehicleBrandSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $brands = [
            'Renault' => ['Clio', 'Megane', 'Captur', 'Twingo', 'Scenic'],
            'Peugeot' => ['208', '308', '3008', '2008', '508'],
            'Citroën' => ['C3', 'C4', 'C5 Aircross', 'Berlingo'],
            'Volkswagen' => ['Golf', 'Polo', 'Tiguan', 'Passat', 'T-Roc'],
            'Dacia' => ['Sandero', 'Duster', 'Logan', 'Jogger'],
            'Toyota' => ['Yaris', 'Corolla', 'RAV4', 'Prius', 'Aygo X'],
            'Ford' => ['Fiesta', 'Focus', 'Puma', 'Kuga'],
            'Nissan' => ['Micra', 'Qashqai', 'Juke'],
            'Hyundai' => ['i10', 'i20', 'Tucson', 'Kona'],
            'Kia' => ['Picanto', 'Sportage', 'Ceed', 'Niro'],
            'Skoda' => ['Fabia', 'Octavia', 'Kamiq'],
            'Mercedes-Benz' => ['Classe A', 'Classe C', 'GLA', 'CLA'],
            'BMW' => ['Serie 1', 'Serie 3', 'X1', 'X2'],
            'Audi' => ['A1', 'A3', 'Q2', 'Q3'],
            'Opel' => ['Corsa', 'Astra', 'Crossland'],
        ];

        foreach ($brands as $brandName => $models) {
            $brand = VehicleBrand::query()->updateOrCreate(['name' => $brandName]);

            foreach ($models as $modelName) {
                VehicleModel::query()->updateOrCreate([
                    'brand_id' => $brand->id,
                    'name' => $modelName,
                ]);
            }
        }
    }
}

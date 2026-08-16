<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Matches the documents already requested in the driver onboarding flow
     * (driver-onboarding.tsx's "Préparez vos documents" step).
     */
    public function run(): void
    {
        $types = [
            ['slug' => 'permis_conduire', 'name' => 'Permis de conduire', 'description' => 'Permis de conduire, recto verso.'],
            ['slug' => 'carte_grise', 'name' => 'Carte grise', 'description' => "Certificat d'immatriculation du véhicule."],
            ['slug' => 'attestation_assurance', 'name' => "Attestation d'assurance", 'description' => "Attestation d'assurance du véhicule en cours de validité."],
            ['slug' => 'piece_identite', 'name' => "Pièce d'identité", 'description' => "Carte d'identité ou passeport."],
            ['slug' => 'photo_profil', 'name' => 'Photo de profil', 'description' => 'Photo claire du visage du chauffeur.'],
        ];

        foreach ($types as $type) {
            DocumentType::query()->updateOrCreate(
                ['slug' => $type['slug']],
                $type + ['required' => true, 'active' => true],
            );
        }
    }
}

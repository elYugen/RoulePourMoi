<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            ['slug' => 'client', 'name' => 'Client', 'description' => 'Réserve et effectue des trajets en tant que passager.'],
            ['slug' => 'driver', 'name' => 'Chauffeur', 'description' => 'Effectue des trajets pour le compte des clients.'],
            ['slug' => 'support_agent', 'name' => 'Agent support', 'description' => "Traite les demandes d'assistance des utilisateurs."],
            ['slug' => 'accountant', 'name' => 'Comptable', 'description' => 'Gère la facturation et les paiements.'],
            ['slug' => 'admin', 'name' => 'Administrateur', 'description' => 'Administre la plateforme.'],
            ['slug' => 'super_admin', 'name' => 'Super administrateur', 'description' => 'Accès complet à la plateforme.'],
        ];

        foreach ($roles as $role) {
            Role::query()->updateOrCreate(['slug' => $role['slug']], $role);
        }
    }
}

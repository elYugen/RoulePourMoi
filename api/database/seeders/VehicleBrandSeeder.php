<?php

namespace Database\Seeders;

use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class VehicleBrandSeeder extends Seeder
{
    /**
     * Seed the application's database with real car brands and models sold
     * (new or still in circulation) on the French/European market — kept as
     * local data rather than an external API (see git history for why).
     */
    public function run(): void
    {
        $brands = [
            // Généralistes français
            'Renault' => ['Twingo', 'Clio', 'Captur', 'Megane', 'Megane E-Tech', 'Austral', 'Espace', 'Scenic', 'Arkana', 'Zoe', 'Talisman', 'Kadjar', 'Kangoo', 'Trafic', 'Master'],
            'Renault Trucks' => ['D', 'D Wide', 'C', 'K', 'T'],
            'Peugeot' => ['108', '208', 'e-208', '2008', '308', '408', '3008', '508', '5008', 'Rifter', 'Partner', 'Bipper', 'Expert', 'Boxer'],
            'Citroën' => ['Ami', 'C1', 'C3', 'C3 Aircross', 'C4', 'C4 X', 'C5 Aircross', 'C5 X', 'C-Elysée', 'Nemo', 'Berlingo', 'SpaceTourer', 'Jumpy', 'Jumper'],
            'DS Automobiles' => ['DS 3', 'DS 4', 'DS 7', 'DS 9'],
            'Alpine' => ['A110'],

            // Allemands
            'Volkswagen' => ['Up!', 'Polo', 'Golf', 'T-Cross', 'T-Roc', 'Tiguan', 'Touareg', 'Passat', 'Arteon', 'Touran', 'Transporter', 'Caddy', 'Caddy Cargo', 'Multivan', 'Amarok', 'Crafter', 'ID.3', 'ID.4', 'ID.5'],
            'Audi' => ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'Q8 e-tron', 'e-tron GT', 'TT', 'R8'],
            'BMW' => ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 4', 'Serie 5', 'Serie 6', 'Serie 7', 'Serie 8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX'],
            'Mercedes-Benz' => ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'Classe G', 'CLA', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'Citan', 'Vito', 'Sprinter', 'eSprinter', 'eVito', 'Actros', 'Atego', 'Arocs', 'Econic', 'EQA', 'EQB', 'EQE', 'EQS'],
            'Opel' => ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland', 'Insignia', 'Combo', 'Zafira', 'Vivaro', 'Movano'],
            'Smart' => ['Fortwo', 'Forfour', '#1'],
            'Porsche' => ['911', '718 Cayman', '718 Boxster', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],

            // Italiens
            'Fiat' => ['500', '500e', '500X', 'Panda', 'Tipo', 'Punto', 'Fiorino', 'Doblo', 'Scudo', 'Talento', 'Ducato'],
            'Alfa Romeo' => ['Giulia', 'Stelvio', 'Tonale'],
            'Lancia' => ['Ypsilon'],
            'Abarth' => ['500', '595', '695'],
            'Maserati' => ['Ghibli', 'Levante', 'Quattroporte', 'Grecale'],
            'Ferrari' => ['Roma', 'Portofino', '296', 'SF90'],
            'Lamborghini' => ['Huracán', 'Urus', 'Revuelto'],
            'Bugatti' => ['Chiron', 'Veyron'],
            'Piaggio' => ['Porter', 'Porter NP6', 'Ape'],
            'Iveco' => ['Daily', 'Massif', 'Eurocargo'],

            // Britanniques
            'Mini' => ['Cooper', 'Countryman', 'Clubman'],
            'Land Rover' => ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
            'Jaguar' => ['E-Pace', 'F-Pace', 'XE', 'XF', 'F-Type', 'I-Pace'],
            'Aston Martin' => ['DB11', 'Vantage', 'DBX'],
            'Bentley' => ['Continental GT', 'Bentayga', 'Flying Spur'],
            'Rolls-Royce' => ['Ghost', 'Phantom', 'Cullinan'],
            'McLaren' => ['GT', 'Artura', '720S'],
            'Lotus' => ['Emira', 'Eletre'],
            'Rover' => ['25', '75'],
            'MG' => ['MG3', 'ZS', 'HS', 'MG4', 'MG5'],

            // Suédois
            'Volvo' => ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'EX30'],
            'Volvo Trucks' => ['FH', 'FM', 'FMX', 'FE', 'FL'],
            'Polestar' => ['2', '3', '4'],
            'Saab' => ['9-3', '9-5'],

            // Tchèque / Espagnol / Roumain
            'Skoda' => ['Fabia', 'Scala', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Superb', 'Enyaq'],
            'Seat' => ['Ibiza', 'Arona', 'Leon', 'Ateca', 'Tarraco'],
            'Cupra' => ['Formentor', 'Leon', 'Born', 'Ateca', 'Tavascan'],
            'Dacia' => ['Sandero', 'Sandero Stepway', 'Duster', 'Jogger', 'Spring', 'Logan'],

            // Japonais
            'Toyota' => ['Aygo X', 'Yaris', 'Yaris Cross', 'Corolla', 'Corolla Cross', 'C-HR', 'RAV4', 'Highlander', 'Prius', 'Camry', 'Proace', 'Proace City', 'Proace Verso', 'Land Cruiser', 'Hilux', 'GR86', 'GR Yaris'],
            'Nissan' => ['Micra', 'Note', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya', 'Navara', 'NV200', 'Townstar', 'Primastar', 'Interstar'],
            'Honda' => ['Jazz', 'Civic', 'HR-V', 'ZR-V', 'CR-V', 'e'],
            'Mazda' => ['Mazda2', 'Mazda3', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'MX-30', 'MX-5'],
            'Mitsubishi' => ['Space Star', 'ASX', 'Eclipse Cross', 'Outlander', 'L200'],
            'Suzuki' => ['Swift', 'Ignis', 'Vitara', 'S-Cross', 'Jimny', 'Across'],
            'Subaru' => ['Impreza', 'XV', 'Forester', 'Outback', 'Solterra'],
            'Lexus' => ['CT', 'UX', 'NX', 'RX', 'ES', 'LS', 'LC'],
            'Infiniti' => ['Q30', 'QX30'],
            'Daihatsu' => ['Sirion', 'Terios', 'Cuore', 'Hijet'],
            'Isuzu' => ['D-Max', 'N-Series'],

            // Coréens
            'Hyundai' => ['i10', 'i20', 'i30', 'Bayon', 'Kona', 'Tucson', 'Santa Fe', 'Ioniq 5', 'Ioniq 6', 'Staria', 'H350'],
            'Kia' => ['Picanto', 'Rio', 'Stonic', 'Ceed', 'XCeed', 'Sportage', 'Sorento', 'Niro', 'EV6', 'EV9'],
            'Genesis' => ['G70', 'GV60', 'GV70', 'GV80'],
            'SsangYong' => ['Tivoli', 'Korando', 'Rexton', 'Torres'],

            // Chinois
            'BYD' => ['Atto 3', 'Dolphin', 'Seal', 'Han', 'Tang'],
            'Ora' => ['Funky Cat'],
            'Xpeng' => ['G6', 'G9', 'P7'],
            'Leapmotor' => ['T03', 'C10'],

            // Américains
            'Ford' => ['Ka+', 'Fiesta', 'Focus', 'Puma', 'Kuga', 'EcoSport', 'Mondeo', 'Ranger', 'Transit', 'Transit Custom', 'Transit Connect', 'Transit Courier', 'Mustang', 'Mustang Mach-E'],
            'Tesla' => ['Model 3', 'Model Y', 'Model S', 'Model X'],
            'Jeep' => ['Renegade', 'Compass', 'Avenger', 'Wrangler', 'Grand Cherokee'],
            'Chevrolet' => ['Corvette', 'Camaro'],
            'Chrysler' => ['300C'],
            'Cadillac' => ['Lyriq'],

            // Poids lourds
            'Man' => ['TGE', 'TGL', 'TGM', 'TGX', 'TGS'],
            'Scania' => ['P-Series', 'G-Series', 'R-Series', 'S-Series'],
            'DAF' => ['LF', 'CF', 'XF'],
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

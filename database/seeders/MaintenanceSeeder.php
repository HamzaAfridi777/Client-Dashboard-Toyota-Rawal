<?php

namespace Database\Seeders;

use App\Models\Maintenance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $maintenances = [
            [
                'name' => 'ENGINE OILCHANGE',
                'image' => 'img.png'
            ],
            [
                'name' => 'SUVs & Pickups',
                'image' => 'img.png'
            ]
        ];

        foreach ($maintenances as $maintenance) {
            Maintenance::create($maintenance); 
        }
    }
}

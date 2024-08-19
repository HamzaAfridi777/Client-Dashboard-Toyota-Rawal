<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services =
            [
                "Cars & MPV's",
                "SUVs & Pickups",
                "Buses & Vans"

        ];

        foreach ($services as $service) {
            Category::create(['name' => $service]);
        }
    }
}

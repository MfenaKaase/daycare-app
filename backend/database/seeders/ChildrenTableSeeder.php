<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ChildrenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('children')->insert([
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'middle_name' => 'Michael',
                'photo' => null, // Or path to a placeholder image
                'date_of_birth' => '2015-06-01',
                'allergies' => 'Peanuts',
                'medical_history' => 'Asthma',
                'special_needs' => 'Speech Therapy',
                'parent_id' => 1, // Ensure this parent exists in the `parents` table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'middle_name' => 'Ann',
                'photo' => null,
                'date_of_birth' => '2017-08-12',
                'allergies' => 'None',
                'medical_history' => 'None',
                'special_needs' => 'None',
                'parent_id' => 2, // Ensure this parent exists
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more records as needed
        ]);
    }
}

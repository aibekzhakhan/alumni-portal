<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class MajorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('majors')->insert([
            ['id' => 1, 'name' => 'Engineering', 'degree_id' => 1],
            ['id' => 2, 'name' => 'Business and Economics', 'degree_id' => 1],
            ['id' => 3, 'name' => 'Biological Sciences', 'degree_id' => 1],
            ['id' => 4, 'name' => 'Medicine, Pre-Clinical and Health', 'degree_id' => 1],
            ['id' => 5, 'name' => 'Computer Science', 'degree_id' => 1],
            ['id' => 6, 'name' => 'Social Sciences', 'degree_id' => 1],
            ['id' => 7, 'name' => 'Arts and Humanities', 'degree_id' => 1],
            ['id' => 8, 'name' => 'Physical Sciences', 'degree_id' => 1],

            ['id' => 9, 'name' => 'Engineering', 'degree_id' => 2],
            ['id' => 10, 'name' => 'Business and Economics', 'degree_id' => 2],
            ['id' => 11, 'name' => 'Biological Sciences', 'degree_id' => 2],
            ['id' => 12, 'name' => 'Medicine, Pre-Clinical and Health', 'degree_id' => 2],
            ['id' => 13, 'name' => 'Computer Science', 'degree_id' => 2],
            ['id' => 14, 'name' => 'Social Sciences', 'degree_id' => 2],
            ['id' => 15, 'name' => 'Education', 'degree_id' => 2],
            ['id' => 16, 'name' => 'Physical Sciences', 'degree_id' => 2],

            ['id' => 17, 'name' => 'Engineering', 'degree_id' => 3],
            ['id' => 18, 'name' => 'Business and Economics', 'degree_id' => 3],
            ['id' => 19, 'name' => 'Biological Sciences', 'degree_id' => 3],
            ['id' => 20, 'name' => 'Medicine, Pre-Clinical and Health', 'degree_id' => 3],
            ['id' => 21, 'name' => 'Computer Science', 'degree_id' => 3],
            ['id' => 22, 'name' => 'Social Sciences', 'degree_id' => 3],
            ['id' => 23, 'name' => 'Education', 'degree_id' => 3],
            ['id' => 24, 'name' => 'Physical Sciences', 'degree_id' => 3],
        ]);
    }
}

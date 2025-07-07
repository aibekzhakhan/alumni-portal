<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('programs')->insert([
            // Undergraduate - Engineering
            ['name' => 'Bachelor of Engineering in Mechanical and Aerospace Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Engineering in Chemical and Materials Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Engineering in Electrical and Computer Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Engineering in Civil and Environmental Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Science in Petroleum Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Science in Mining Engineering', 'major_id' => 1],
            ['name' => 'Bachelor of Science in Robotics Engineering', 'major_id' => 1],

            // Undergraduate - Business and Economics
            ['name' => 'Bachelor of Arts in Economics', 'major_id' => 2],
            ['name' => 'Bachelor of Business Administration', 'major_id' => 2],

            // Undergraduate - Biological Sciences
            ['name' => 'Bachelor of Science in Biological Sciences', 'major_id' => 3],

            // Undergraduate - Medicine
            ['name' => 'Bachelor in Nursing', 'major_id' => 4],
            ['name' => 'Six-Year Undergraduate Medical Program', 'major_id' => 4],

            // Undergraduate - Computer Science
            ['name' => 'Bachelor of Science in Computer Science', 'major_id' => 5],

            // Undergraduate - Social Sciences
            ['name' => 'Bachelor of Arts in Anthropology', 'major_id' => 6],
            ['name' => 'Bachelor of Arts in Political Science and International Relations', 'major_id' => 6],
            ['name' => 'Bachelor of Arts in Sociology', 'major_id' => 6],

            // Undergraduate - Arts and Humanities
            ['name' => 'Bachelor of Arts in History', 'major_id' => 7],
            ['name' => 'Bachelor of Arts in World Languages, Literature and Culture', 'major_id' => 7],

            // Undergraduate - Physical Sciences
            ['name' => 'Bachelor of Science in Chemistry', 'major_id' => 8],
            ['name' => 'Bachelor of Science in Physics', 'major_id' => 8],
            ['name' => 'Bachelor of Science in Mathematics', 'major_id' => 8],
            ['name' => 'Bachelor of Science in Geology', 'major_id' => 8],

            // Master's - Engineering
            ['name' => 'Master of Engineering Management', 'major_id' => 9],
            ['name' => 'Master of Science in Mechanical and Aerospace Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Electrical and Computer Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Chemical and Materials Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Civil and Environmental Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Biomedical Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Mining Engineering', 'major_id' => 9],
            ['name' => 'Master of Science in Petroleum Engineering', 'major_id' => 9],

            // Master's - Business and Economics
            ['name' => 'Master of Arts in Economics', 'major_id' => 10],
            ['name' => 'Master of Business Administration', 'major_id' => 10],
            ['name' => 'Master of Science in Finance', 'major_id' => 10],
            ['name' => 'Executive Master of Business Administration', 'major_id' => 10],

            // Master's - Biological Sciences
            ['name' => 'Master of Science in Life Sciences', 'major_id' => 11],

            // Master's - Medicine
            ['name' => 'Master in Sports Medicine and Rehabilitation', 'major_id' => 12],
            ['name' => 'Master of Pharmacology and Toxicology', 'major_id' => 12],
            ['name' => 'Master of Public Health', 'major_id' => 12],
            ['name' => 'Master of Molecular Medicine', 'major_id' => 12],
            ['name' => 'Doctor of Medicine', 'major_id' => 12],

            // Master's - Computer Science
            ['name' => 'Master of Science in Computer Science', 'major_id' => 13],
            ['name' => 'Master of Science in Data Science', 'major_id' => 13],

            // Master's - Social Sciences
            ['name' => 'Master of Arts in Eurasian Studies', 'major_id' => 14],
            ['name' => 'Master of Arts in Political Science and International Relations', 'major_id' => 14],
            ['name' => 'Master in Public Policy', 'major_id' => 14],
            ['name' => 'Master in Public Administration', 'major_id' => 14],
            ['name' => 'Online Master in Public Administration', 'major_id' => 14],

            // Master's - Education
            ['name' => 'Master of Science in Educational Leadership', 'major_id' => 15],
            ['name' => 'Master of Arts in Multilingual Education', 'major_id' => 15],

            // Master's - Physical Sciences
            ['name' => 'Master of Science in Applied Mathematics', 'major_id' => 16],
            ['name' => 'Master of Science in Chemistry', 'major_id' => 16],
            ['name' => 'Master of Science in Physics', 'major_id' => 16],
            ['name' => 'Master of Science in Geosciences', 'major_id' => 16],

            // PhD - Engineering
            ['name' => 'Doctor of Philosophy in Civil Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Electrical Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Mechanical Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Robotics Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Chemical Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Petroleum Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Mining Engineering', 'major_id' => 17],
            ['name' => 'Doctor of Philosophy in Science, Engineering and Technology', 'major_id' => 17],

            // PhD - Business and Economics
            ['name' => 'PhD in Business Administration', 'major_id' => 18],

            // PhD - Biological Sciences
            ['name' => 'Doctor of Philosophy in Life Sciences', 'major_id' => 19],

            // PhD - Medicine
            ['name' => 'Doctor of Philosophy in Biomedical Sciences', 'major_id' => 20],
            ['name' => 'Doctor of Philosophy in Global Health', 'major_id' => 20],

            // PhD - Computer Science
            ['name' => 'Doctor of Philosophy in Computer Science', 'major_id' => 21],

            // PhD - Social Sciences
            ['name' => 'Doctor of Philosophy in Public Policy', 'major_id' => 22],
            ['name' => 'Doctor of Philosophy in Eurasian Studies', 'major_id' => 22],

            // PhD - Education
            ['name' => 'Doctor of Philosophy in Education', 'major_id' => 23],

            // PhD - Physical Sciences
            ['name' => 'Doctor of Philosophy in Mathematics', 'major_id' => 24],
            ['name' => 'Doctor of Philosophy in Physics', 'major_id' => 24],
            ['name' => 'Doctor of Philosophy in Chemistry', 'major_id' => 24],
        ]);
    }
}

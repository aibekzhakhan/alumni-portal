<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('alumni', function (Blueprint $table) {
            $table->string('avatar')->nullable(); // Avatar (Profile picture)
            $table->unsignedBigInteger('degree_id')->nullable(); // Foreign key to degrees table
            $table->unsignedBigInteger('major_id')->nullable(); // Foreign key to majors table
            $table->unsignedBigInteger('program_id')->nullable(); // Foreign key to programs table
            $table->string('phone_number')->nullable(); // Phone number
        });
    }

    public function down()
    {
        Schema::table('alumni', function (Blueprint $table) {
            $table->dropColumn(['avatar', 'graduation_year', 'degree_id', 'major_id', 'program_id', 'bio', 'phone_number']);
        });
    }

};

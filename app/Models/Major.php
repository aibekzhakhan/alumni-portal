<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    // Define the table name if it is not the plural of the model name
    protected $table = 'majors';

    // Specify the fields that can be mass-assigned
    protected $fillable = [
        'name', // e.g., 'Engineering', 'Business and Economics', etc.
        'degree_id', // Foreign key referencing Degree model
    ];

    // Define the relationship with the Degree model
    public function degree()
    {
        return $this->belongsTo(Degree::class, 'degree_id');
    }

    // Define the relationship with the Program model
    public function programs()
    {
        return $this->hasMany(Program::class, 'major_id');
    }
}

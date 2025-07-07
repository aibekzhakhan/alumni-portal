<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    // Define the table name if it is not the plural of the model name
    protected $table = 'degrees';

    // Specify the fields that can be mass-assigned
    protected $fillable = [
        'name', // e.g., 'Undergraduate', 'Master’s', 'PhD'
    ];

    // Define the relationship with the Major model
    public function majors()
    {
        return $this->hasMany(Major::class, 'degree_id');
    }

    // Define the relationship with the Program model
    public function programs()
    {
        return $this->hasManyThrough(Program::class, Major::class);
    }
}

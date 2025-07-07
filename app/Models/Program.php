<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    // Define the table name if it is not the plural of the model name
    protected $table = 'programs';

    // Specify the fields that can be mass-assigned
    protected $fillable = [
        'name', // e.g., 'Bachelor of Engineering in Mechanical and Aerospace Engineering'
        'major_id', // Foreign key referencing Major model
    ];

    // Define the relationship with the Major model
    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id');
    }
}

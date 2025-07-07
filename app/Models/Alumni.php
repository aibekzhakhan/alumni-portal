<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    //
    use HasFactory;
    protected $table = 'alumni';

    protected $fillable = [
        'user_id',
        'graduation_year',
        'avatar',
        'bio',
        'degree_id',
        'major_id',
        'program_id',
        'phone_number',
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}

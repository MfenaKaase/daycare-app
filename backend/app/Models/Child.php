<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'photo',
        'date_of_birth',
        'allergies',
        'medical_history',
        'special_needs',
        'parent_id',
    ];
}

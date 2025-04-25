<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacationPackage extends Model
{
    use HasFactory;

    protected $fillable = [
    'package_name', 
    'description', 
    'price', 
    'vacation_length', 
    'image_url'
    ];
}

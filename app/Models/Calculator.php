<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calculator extends Model
{
    use HasFactory;
    protected $fillable = [
        'service',
        'description',
        'history',
        'calculatorservice',
        'image',
    ];
}

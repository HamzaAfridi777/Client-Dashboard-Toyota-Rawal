<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValueTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'heading',
        'image1',
        'image2',
    ];
}

<?php

// app/Models/CarBooking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'note1',
        'note2',
        'note3',
        'note4',
        'image1',
        'image2',
    ];
}


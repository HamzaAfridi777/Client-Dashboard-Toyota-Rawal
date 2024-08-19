<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarCareTip extends Model
{
    use HasFactory;

    protected $fillable = [
        'heading',
        'description',
        'imagetitle1',
        'imagedescription1',
        'imageshare1',
        'imagecomment1',
        'imagetitle2',
        'imagedescription2',
        'imageshare2',
        'imagecomment2',
        'image1',
        'image2',
        'tips',
    ];

    protected $casts = [
        'tips' => 'array',
    ];
}

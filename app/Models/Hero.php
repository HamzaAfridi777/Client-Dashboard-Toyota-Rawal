<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    use HasFactory;

    protected $fillable=[
        'new_arrival_id',
        'car_hero_image',
    ];

    public function newarrivals()
    {
        return $this->belongsTo(NewArrival::class);
    }
}

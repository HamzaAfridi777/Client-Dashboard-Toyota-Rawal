<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InteriorDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'new_arrival_id',
        'title',
        'details',
        'image'
    ];
}

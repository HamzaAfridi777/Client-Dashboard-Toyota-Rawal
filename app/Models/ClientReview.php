<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientReview extends Model
{
    use HasFactory;
    
    protected $fillable = [
        //'heading',
       // 'description',
        'name',
        'service',
        'servicedescription',
        'image1',
    ];
}


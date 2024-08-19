<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToyotaSure extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'heading1',
        'note1',
        'heading2',
        'note2',
        'heading3',
        'note3',
        'image1',
    ];
}

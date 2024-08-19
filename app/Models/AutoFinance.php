<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoFinance extends Model
{
    use HasFactory;

    protected $fillable = [
        'car',
        'name',
        'email',
        'phone',
        'landline',
        'income',
        'bank',
        'comment'
    ];
}

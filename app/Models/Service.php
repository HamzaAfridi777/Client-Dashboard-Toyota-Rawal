<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

    use HasFactory;

    protected $fillable = [
        "service_category_id",
        'name',
        'image',
        'description',
    ];

    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }
}


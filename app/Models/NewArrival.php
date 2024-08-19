<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewArrival extends Model
{
    protected $fillable = [
        'car_name', 'category_id', 'car_price', 'car_type', 'car_type_description',
        'car_card_image', 'car_hero_image', 'categories_car_images'
    ];

    // Define relationships
    public function interiorDetails()
    {
        return $this->hasMany(InteriorDetail::class);
    }

    public function exteriorDetails()
    {
        return $this->hasMany(ExteriorDetail::class);
    }

    public function performanceDetails()
    {
        return $this->hasMany(PerformanceDetail::class);
    }

    public function safetyDetails()
    {
        return $this->hasMany(SafetyDetail::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}

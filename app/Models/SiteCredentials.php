<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteCredentials extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'email', 
        'customer_relation_number', 
        'site_title',
        'facebook_link', 
        'twitter_link', 
        'instagram_link',
        'linkedin_link', 
        'whatsapp_number', 
        'address', 
        'site_logo',
    ];
}

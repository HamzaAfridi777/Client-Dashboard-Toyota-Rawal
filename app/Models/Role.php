<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use Spatie\Permission\Models\Role as SpatieRole;

//class Role extends SpatieRole
class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function permissions()
{
    return $this->belongsToMany(Permission::class);
}
}

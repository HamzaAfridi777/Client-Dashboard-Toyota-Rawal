<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chooses', function (Blueprint $table) {
            $table->id();
            $table->string('heading')->nullable();
            $table->string('description')->nullable();
            $table->string('years')->nullable();
            $table->string('technicians')->nullable();
            $table->string('customer')->nullable();
            $table->string('employee')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chooses');
    }
};

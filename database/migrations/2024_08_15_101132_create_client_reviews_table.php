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
        Schema::create('client_reviews', function (Blueprint $table) {
            $table->id();
         //   $table->string('heading')->nullable();
         //   $table->string('description')->nullable();
            $table->string('name')->nullable();
            $table->string('service')->nullable();
            $table->string('servicedescription')->nullable();
            $table->string('image1')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_reviews');
    }
};

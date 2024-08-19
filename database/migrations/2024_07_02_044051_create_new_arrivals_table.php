<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('new_arrivals', function (Blueprint $table) {
            $table->id();
            $table->string('car_name');
            $table->foreignId('category_id')->constrained(); // New column
            $table->decimal('car_price', 10, 2);
            $table->string('car_type');
            $table->text('car_type_description');
            $table->string('car_card_image')->nullable();
            $table->string('car_hero_image')->nullable();
            $table->json('categories_car_images')->nullable();
            // $table->string('title')->nullable();
            // $table->text('details')->nullable();
            // $table->string('image')->nullable(); // Add image column
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_arrivals');
    }
};

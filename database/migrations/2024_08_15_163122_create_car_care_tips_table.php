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
        Schema::create('car_care_tips', function (Blueprint $table) {
            $table->id();
            $table->string('heading')->nullable();
            $table->text('description')->nullable();
            $table->string('imagetitle1')->nullable();
            $table->text('imagedescription1')->nullable();
            $table->string('imageshare1')->nullable();
            $table->text('imagecomment1')->nullable();
            $table->string('imagetitle2')->nullable();
            $table->text('imagedescription2')->nullable();
            $table->string('imageshare2')->nullable();
            $table->text('imagecomment2')->nullable();
            $table->string('image1')->nullable();
            $table->string('image2')->nullable();
            $table->json('tips')->nullable(); // Store tips as a JSON field
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_care_tips');
    }
};

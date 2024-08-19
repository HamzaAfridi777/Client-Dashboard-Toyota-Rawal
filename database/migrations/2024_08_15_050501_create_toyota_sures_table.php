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
        Schema::create('toyota_sures', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->string('heading1')->nullable();
            $table->string('note1')->nullable();
            $table->string('heading2')->nullable();
            $table->string('note2')->nullable();
            $table->string('heading3')->nullable();
            $table->string('note3')->nullable();
            $table->string('image1')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toyota_sures');
    }
};

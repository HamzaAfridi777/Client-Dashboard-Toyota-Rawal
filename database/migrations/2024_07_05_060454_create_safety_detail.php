<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('safety_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('new_arrival_id')->constrained('new_arrivals')->onDelete('cascade');
            $table->string('title');
            $table->text('details');
            $table->string('image')->nullable(); // Add image column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('safety_details');
    }
};

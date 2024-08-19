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
        Schema::create('site_credentials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('customer_relation_number'); // Updated to match the form
            $table->string('site_title');
            $table->string('facebook_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('whatsapp_number'); // Updated to match the form
            $table->string('address');
            $table->string('site_logo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_credentials');
    }
};

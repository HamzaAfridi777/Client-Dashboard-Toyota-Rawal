<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auto_finances', function (Blueprint $table) {
            $table->id();
            $table->string('car');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('landline')->nullable();
            $table->decimal('income', 10, 2);
            $table->string('bank');
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auto_finances');
    }
};

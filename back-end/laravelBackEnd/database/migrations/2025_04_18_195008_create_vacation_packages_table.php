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
        Schema::create('vacation_packages', function (Blueprint $table) {
            $table->id();     
            $table->string('package_name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->integer('vacation_length');
            $table->string('image_url');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacation_packages');
    }
};

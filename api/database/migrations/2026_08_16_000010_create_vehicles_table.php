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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('driver_id')->constrained('users')->cascadeOnDelete();

            $table->foreignId('vehicle_type_id')->constrained('vehicle_types')->restrictOnDelete();

            $table->foreignId('brand_id')->constrained('vehicle_brands')->restrictOnDelete();
            $table->foreignId('model_id')->constrained('vehicle_models')->restrictOnDelete();
            $table->string('registration')->unique();
            $table->string('color');
            $table->unsignedSmallInteger('year');
            $table->enum('fuel_type', ['essence', 'diesel', 'hybride', 'electrique', 'gpl']);
            $table->unsignedTinyInteger('seats');
            // No confirmed list of statuses yet: mirrors the users.status pattern
            // (pending validation, then active) until confirmed otherwise.
            $table->enum('status', ['pending', 'active', 'suspended', 'inactive'])->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};

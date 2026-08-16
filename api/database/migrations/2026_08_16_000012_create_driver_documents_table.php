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
        Schema::create('driver_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('users')->cascadeOnDelete();

            $table->foreignId('document_type_id')->constrained('document_types')->restrictOnDelete();

            $table->foreignId('media_id')->constrained('media')->cascadeOnDelete();
            $table->enum('status', ['pending', 'approved', 'rejected', 'expired'])->default('pending');
            $table->string('document_number');
            $table->date('issued_at');
            // Not every document type expires (e.g. some ID cards never did).
            $table->date('expires_at')->nullable();
            $table->foreignId('validated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('validated_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_documents');
    }
};

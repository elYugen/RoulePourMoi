<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug', 'description', 'required', 'active'])]
class DocumentType extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'required' => 'boolean',
            'active' => 'boolean',
        ];
    }

    public function driverDocuments(): HasMany
    {
        return $this->hasMany(DriverDocument::class, 'document_type_id');
    }
}

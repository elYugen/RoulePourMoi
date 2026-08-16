<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'vehicle_type_id' => ['required', 'integer', 'exists:vehicle_types,id'],
            'brand_id' => ['required', 'integer', 'exists:vehicle_brands,id'],
            'model_id' => [
                'required',
                'integer',
                Rule::exists('vehicle_models', 'id')->where(
                    fn ($query) => $query->where('brand_id', $this->input('brand_id')),
                ),
            ],
            'registration' => ['required', 'string', 'max:20', 'unique:vehicles,registration'],
            'color' => ['required', 'string', 'max:50'],
            'year' => ['required', 'integer', 'min:1980', 'max:'.(date('Y') + 1)],
            'fuel_type' => ['required', Rule::in(['essence', 'diesel', 'hybride', 'electrique', 'gpl'])],
            'seats' => ['required', 'integer', 'min:1', 'max:9'],
        ];
    }
}

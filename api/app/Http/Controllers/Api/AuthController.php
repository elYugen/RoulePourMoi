<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Services\Auth\TokenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(protected TokenService $tokens) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $role = $data['role'] ?? 'client';

        $user = User::query()->create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => $data['password'],
            'birth_date' => $data['birth_date'] ?? null,
            // Drivers stay pending until their documents/questionnaire are validated.
            'status' => $role === 'driver' ? 'pending' : 'active',
        ]);

        if ($roleModel = Role::query()->where('slug', $role)->first()) {
            $user->roles()->attach($roleModel->id);
        }

        $issued = $this->tokens->issue($user, $request);

        return response()->json([
            'user' => new UserResource($user->load(['roles', 'avatar'])),
            'token' => $issued['token'],
            'expires_at' => $issued['expires_at'],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::query()
            ->where('email', $data['login'])
            ->orWhere('phone', $data['login'])
            ->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Identifiants invalides.'], 401);
        }

        $user->forceFill(['last_login_at' => now()])->save();

        $issued = $this->tokens->issue($user, $request);

        return response()->json([
            'user' => new UserResource($user->load(['roles', 'avatar'])),
            'token' => $issued['token'],
            'expires_at' => $issued['expires_at'],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('session')?->delete();

        return response()->json(null, 204);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()->load(['roles', 'avatar'])),
        ]);
    }
}

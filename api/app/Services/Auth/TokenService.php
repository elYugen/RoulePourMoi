<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\UserDevice;
use App\Models\UserSession;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TokenService
{
    /**
     * Issue a new API token for the given user, and record it as a user_sessions row.
     *
     * @return array{token: string, expires_at: \Illuminate\Support\Carbon}
     */
    public function issue(User $user, Request $request): array
    {
        $token = Str::random(64);
        $expiresAt = now()->addDays((int) config('auth.token_ttl_days'));

        $session = new UserSession([
            'token_hash' => hash('sha256', $token),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'expires_at' => $expiresAt,
        ]);
        $session->user_id = $user->id;
        $session->device_id = $this->resolveDevice($user, $request)?->id;
        $session->save();

        return ['token' => $token, 'expires_at' => $expiresAt];
    }

    /**
     * Best-effort: only register/update the device if the client sent a device_uuid.
     * Requests that don't include device info simply get a session with no device link.
     */
    protected function resolveDevice(User $user, Request $request): ?UserDevice
    {
        if (! $request->filled('device_uuid')) {
            return null;
        }

        return UserDevice::query()->updateOrCreate(
            ['device_uuid' => $request->string('device_uuid')->toString()],
            [
                'user_id' => $user->id,
                'device_type' => $request->input('device_type', 'unknown'),
                'brand' => $request->input('brand', 'unknown'),
                'model' => $request->input('model', 'unknown'),
                'os' => $request->input('os', 'unknown'),
                'os_version' => $request->input('os_version', 'unknown'),
                'app_version' => $request->input('app_version', 'unknown'),
                'push_token' => $request->input('push_token'),
                'last_seen_at' => now(),
                'is_active' => true,
            ]
        );
    }
}

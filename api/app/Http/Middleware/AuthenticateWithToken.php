<?php

namespace App\Http\Middleware;

use App\Models\UserSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Authentification requise.'], 401);
        }

        $session = UserSession::query()
            ->with('user')
            ->where('token_hash', hash('sha256', $token))
            ->where('expires_at', '>', now())
            ->first();

        if (! $session || ! $session->user) {
            return response()->json(['message' => 'Session invalide ou expirée.'], 401);
        }

        $session->forceFill(['last_activity_at' => now()])->save();

        $request->setUserResolver(fn () => $session->user);
        $request->attributes->set('session', $session);

        return $next($request);
    }
}

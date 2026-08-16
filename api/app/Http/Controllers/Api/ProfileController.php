<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function updateAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $user = $request->user();
        $file = $request->file('photo');

        // Replace any previous avatar: one user only ever has a single current avatar.
        if ($previous = $user->avatar) {
            Storage::disk($previous->disk)->delete($previous->path);
            $previous->forceDelete();
        }

        $filename = Str::uuid()->toString().'.'.$file->extension();
        $path = $file->storeAs('avatars', $filename, 'public');
        $dimensions = @getimagesize($file->getRealPath());

        $user->media()->create([
            'collection' => 'avatar',
            'disk' => 'public',
            'path' => $path,
            'filename' => $filename,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'width' => $dimensions[0] ?? null,
            'height' => $dimensions[1] ?? null,
            'hash' => hash_file('sha256', $file->getRealPath()),
        ]);

        return response()->json([
            'user' => new UserResource($user->load(['roles', 'avatar'])),
        ]);
    }
}

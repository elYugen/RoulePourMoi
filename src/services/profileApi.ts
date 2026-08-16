import { z } from "zod";

import { api } from "./api";
import { userSchema, type User } from "../schemas/auth";

const updateAvatarResponseSchema = z.object({ user: userSchema });

export type AvatarFile = {
  uri: string;
  name: string;
  type: string;
};

export async function uploadAvatar(file: AvatarFile): Promise<User> {
  const formData = new FormData();
  formData.append("photo", { uri: file.uri, name: file.name, type: file.type } as unknown as Blob);

  const response = await api.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const result = updateAvatarResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error("La réponse du serveur ne correspond pas au format attendu.");
  }
  return result.data.user;
}

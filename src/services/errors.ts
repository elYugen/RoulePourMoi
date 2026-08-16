import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") {
      return message;
    }
    if (error.response) {
      return "Une erreur est survenue, veuillez réessayer.";
    }
    return "Impossible de contacter le serveur, vérifiez votre connexion.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inattendue est survenue.";
}

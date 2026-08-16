import { useRouter } from "expo-router";
import { useState } from "react";

import { AuthScreen } from "../components/AuthScreen";
import { getErrorMessage } from "../services/errors";
import { login } from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async ({ emailOrPhone, password }: { emailOrPhone: string; password: string }) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const { user, token } = await login({ login: emailOrPhone, password });
      dispatch(setCredentials({ user, token }));
      router.replace("/client-home");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      title="Bienvenue 👋"
      subtitle="Connectez-vous pour réserver votre course."
      submitLabel="Se connecter"
      footerText="Pas encore de compte ?"
      footerLinkLabel="Créer un compte"
      onFooterLinkPress={() => router.push("/signup")}
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
}

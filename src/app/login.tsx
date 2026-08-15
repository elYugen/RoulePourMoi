import { useRouter } from "expo-router";

import { AuthScreen } from "../components/AuthScreen";

export default function Login() {
  const router = useRouter();

  return (
    <AuthScreen
      title="Bienvenue 👋"
      subtitle="Connectez-vous pour réserver votre course."
      submitLabel="Se connecter"
      footerText="Pas encore de compte ?"
      footerLinkLabel="Créer un compte"
      onFooterLinkPress={() => router.push("/signup")}
      onSubmit={() => router.push("/client-home")}
    />
  );
}

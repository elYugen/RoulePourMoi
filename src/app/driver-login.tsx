import { useRouter } from "expo-router";

import { AuthScreen } from "../components/AuthScreen";

export default function DriverLogin() {
  const router = useRouter();

  return (
    <AuthScreen
      title="Bienvenue chauffeur 👋"
      subtitle="Connectez-vous pour accepter des courses."
      submitLabel="Se connecter"
      footerText="Pas encore chauffeur ?"
      footerLinkLabel="S'inscrire"
      onFooterLinkPress={() => router.push("/driver-signup")}
    />
  );
}

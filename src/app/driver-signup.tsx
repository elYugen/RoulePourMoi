import { useRouter } from "expo-router";

import { SignupScreen } from "../components/SignupScreen";

export default function DriverSignup() {
  const router = useRouter();

  return (
    <SignupScreen
      title="Créer un compte chauffeur"
      submitLabel="Créer mon compte"
      footerText="Déjà chauffeur ?"
      footerLinkLabel="Se connecter"
      onSubmit={() => router.push("/driver-onboarding")}
    />
  );
}

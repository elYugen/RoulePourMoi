import { SignupScreen } from "../components/SignupScreen";

export default function Signup() {
  return (
    <SignupScreen
      title="Créer un compte"
      submitLabel="Créer mon compte"
      footerText="Déjà un compte ?"
      footerLinkLabel="Se connecter"
    />
  );
}

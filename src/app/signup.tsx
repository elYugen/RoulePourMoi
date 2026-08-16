import { useRouter } from "expo-router";
import { useState } from "react";

import { SignupScreen } from "../components/SignupScreen";
import { getErrorMessage } from "../services/errors";
import { register } from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const { user, token } = await register({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "client",
      });
      dispatch(setCredentials({ user, token }));
      router.replace("/client-home");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupScreen
      title="Créer un compte"
      submitLabel="Créer mon compte"
      footerText="Déjà un compte ?"
      footerLinkLabel="Se connecter"
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
}

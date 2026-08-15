import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { BackButton } from "./BackButton";
import { Checkbox } from "./Checkbox";
import { PrimaryButton } from "./PrimaryButton";
import { Screen } from "./Screen";
import { TextField } from "./TextField";

type SignupValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type SignupScreenProps = {
  title: string;
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  onSubmit?: (values: SignupValues) => void;
  onFooterLinkPress?: () => void;
};

export function SignupScreen({
  title,
  submitLabel,
  footerText,
  footerLinkLabel,
  onSubmit,
  onFooterLinkPress,
}: SignupScreenProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <Screen contentContainerStyle={styles.content}>
      <BackButton onPress={() => router.back()} />

      <View style={styles.header}>
        <Text style={shared.title}>{title}</Text>
      </View>

      <View style={styles.form}>
        <View style={shared.inputRow}>
          <TextField
            placeholder="Prénom"
            style={styles.halfInput}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextField placeholder="Nom" style={styles.halfInput} value={lastName} onChangeText={setLastName} />
        </View>

        <TextField
          placeholder="Adresse mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          placeholder="Numéro de téléphone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextField placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      <View style={[shared.termsRow, styles.terms]}>
        <Checkbox checked={acceptedTerms} onChange={setAcceptedTerms} />
        <Text style={shared.termsText}>
          J&apos;accepte les <Text style={shared.termsLink}>CGU</Text> et la{" "}
          <Text style={shared.termsLink}>Politique de confidentialité</Text>
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label={submitLabel}
          onPress={() => onSubmit?.({ firstName, lastName, email, phone, password })}
        />
        <View style={shared.shortDivider} />
      </View>

      <View style={styles.footer}>
        <Text style={shared.footerText}>{footerText} </Text>
        <Pressable onPress={onFooterLinkPress ?? (() => router.back())}>
          <Text style={shared.footerLink}>{footerLinkLabel}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    justifyContent: "flex-start",
  },
  header: {
    marginTop: spacing.lg,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  halfInput: {
    flex: 1,
  },
  terms: {
    alignItems: "flex-start",
    marginTop: spacing.md,
  },
  actions: {
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.xxl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
});

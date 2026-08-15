import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { BackButton } from "./BackButton";
import { PrimaryButton } from "./PrimaryButton";
import { Screen } from "./Screen";
import { SocialButton } from "./SocialButton";
import { TextField } from "./TextField";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  onSubmit?: (values: { emailOrPhone: string; password: string }) => void;
  onFooterLinkPress?: () => void;
};

export function AuthScreen({
  title,
  subtitle,
  submitLabel,
  footerText,
  footerLinkLabel,
  onSubmit,
  onFooterLinkPress,
}: AuthScreenProps) {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen contentContainerStyle={styles.content}>
      <BackButton onPress={() => router.back()} />

      <View style={styles.header}>
        <Text style={shared.title}>{title}</Text>
        <Text style={shared.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.form}>
        <TextField
          placeholder="Email ou téléphone"
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        <TextField placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />

        <Pressable>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label={submitLabel} onPress={() => onSubmit?.({ emailOrPhone, password })} />

        <Text style={styles.orText}>Ou continuer avec</Text>

        <View style={styles.socialRow}>
          <SocialButton icon="facebook" onPress={() => {}} />
          <SocialButton icon="apple" onPress={() => {}} />
          <SocialButton icon="google" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={shared.footerText}>{footerText} </Text>
        <Pressable onPress={onFooterLinkPress}>
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
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textPrimary,
  },
  actions: {
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.xxl,
  },
  orText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textMuted,
  },
  socialRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
});

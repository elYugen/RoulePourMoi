import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { Icon } from "../components/Icon";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

const IMAGE_RATIO = 1536 / 1024;

const BENEFITS = [
  { icon: "car-front" as const, title: "Recevez des courses", subtitle: "Dès l'activation de votre compte" },
  { icon: "wallet2" as const, title: "Gagnez plus", subtitle: "Des courses adaptées à votre zone" },
  { icon: "chat-left-text" as const, title: "Support dédié", subtitle: "Une équipe à votre écoute 7j/7" },
];

export default function DriverPendingValidation() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const imageWidth = width - spacing.lg * 2;

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <Text style={styles.title}>Presque prêt !</Text>

      <Image
        source={require("../../assets/images/voiture-chrono.png")}
        style={{ width: imageWidth, height: imageWidth / IMAGE_RATIO }}
        resizeMode="contain"
      />

      <View style={styles.header}>
        <Text style={styles.headline}>
          Votre compte est en cours{"\n"}d&apos;<Text style={styles.headlineAccent}>activation</Text>
        </Text>
        <Text style={styles.subtitle}>
          Tout est prêt de notre côté. Dès que votre compte sera activé, vous pourrez recevoir vos
          premières courses.
        </Text>
      </View>

      <View style={[shared.sectionCard, styles.benefitsCard]}>
        {BENEFITS.map((benefit, index) => (
          <View key={benefit.title}>
            {index > 0 ? <View style={styles.benefitDivider} /> : null}
            <View style={styles.benefitRow}>
              <View style={shared.documentIconBox}>
                <Icon name={benefit.icon} size={20} color={colors.accent} />
              </View>
              <View style={styles.benefitTextWrap}>
                <Text style={shared.cardTitle}>{benefit.title}</Text>
                <Text style={shared.cardSubtitle}>{benefit.subtitle}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <PrimaryButton label="Aller sur l'espace client" onPress={() => router.replace("/client-home")} />

      <Pressable onPress={() => router.replace("/")}>
        <Text style={styles.logoutLink}>Retour à l&apos;accueil</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: "center",
    gap: spacing.lg,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  header: {
    alignItems: "center",
    gap: spacing.sm,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
  },
  headlineAccent: {
    color: colors.accent,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  benefitsCard: {
    alignSelf: "stretch",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  benefitTextWrap: {
    flex: 1,
    gap: 2,
  },
  benefitDivider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  logoutLink: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.accent,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";
import { PrimaryButton } from "./PrimaryButton";

const MINIMUM_CORRECT_ANSWERS = 10;

type ValidationSummaryProps = {
  score: number;
  total: number;
  onContinue: () => void;
  onDownloadFormation?: () => void;
  onBackToFormation?: () => void;
};

export function ValidationSummary({
  score,
  total,
  onContinue,
  onDownloadFormation,
  onBackToFormation,
}: ValidationSummaryProps) {
  const percent = Math.round((score / total) * 100);
  const passed = score >= MINIMUM_CORRECT_ANSWERS;

  if (!passed) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.badgeCircle}>
          <Icon name="patch-check" size={130} color={colors.brandRed} />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Questionnaire non validé</Text>
          <Text style={styles.subtitle}>
            Vous devez obtenir au moins {MINIMUM_CORRECT_ANSWERS}/{total} bonnes réponses pour valider le
            questionnaire.
          </Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Votre score</Text>
          <Text style={styles.scoreValue}>
            {score} / {total}
          </Text>
          <Text style={styles.scorePercent}>{percent}% de bonnes réponses</Text>
        </View>

        <PrimaryButton label="Retour à la formation" onPress={onBackToFormation} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.badgeCircle}>
        <Icon name="patch-check" size={130} color={colors.accent} />
      </View>

      <View style={styles.headerText}>
        <Text style={styles.title}>Félicitations !</Text>
        <Text style={styles.subtitle}>Vous avez réussi la formation et le questionnaire avec succès</Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Icon name="patch-check" size={18} color={colors.success} />
          </View>
          <Text style={styles.statusLabel}>Formation</Text>
          <Text style={styles.statusValue}>Validée</Text>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Icon name="check" size={16} color={colors.success} />
          </View>
          <Text style={styles.statusLabel}>Questionnaire</Text>
          <Text style={styles.statusValue}>Réussi</Text>
        </View>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Votre score</Text>
        <Text style={styles.scoreValue}>
          {score} / {total}
        </Text>
        <Text style={styles.scorePercent}>{percent}% de bonnes réponses</Text>
      </View>

      <PrimaryButton label="Suivre l'avancement de mon inscription" onPress={onContinue} />

      <Pressable onPress={onDownloadFormation}>
        <Text style={styles.downloadLink}>Télécharger la formation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: spacing.lg,
  },
  badgeCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  headerText: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignSelf: "stretch",
  },
  statusCard: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: spacing.xl,
  },
  statusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.iconCircle,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  statusLabel: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textPrimary,
  },
  statusValue: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.success,
  },
  scoreCard: {
    alignSelf: "stretch",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: spacing.lg,
  },
  scoreLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  scoreValue: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.accent,
  },
  scorePercent: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  downloadLink: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.accent,
  },
});

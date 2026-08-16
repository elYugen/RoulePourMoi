import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DocumentRow } from "../components/DocumentRow";
import { FormationCarousel } from "../components/FormationCarousel";
import { PrimaryButton } from "../components/PrimaryButton";
import { QuestionnaireQuiz } from "../components/QuestionnaireQuiz";
import { Screen } from "../components/Screen";
import { Stepper } from "../components/Stepper";
import { ValidationSummary } from "../components/ValidationSummary";
import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

const STEPS = ["Documents", "Formation", "Questionnaire", "Validation"];

export default function DriverOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [quizResult, setQuizResult] = useState({ score: 0, total: 0 });

  const handleContinue = () => setStep(step + 1);

  const handleQuizFinish = (score: number, total: number) => {
    setQuizResult({ score, total });
    setStep(step + 1);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {step !== 4 ? (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Inscription en tant que chauffeur</Text>
          <Text style={styles.headerSubtitle}>Rejoignez la communauté</Text>
        </View>
      ) : null}

      {step !== 4 ? <Stepper steps={STEPS} currentStep={step} /> : null}

      {step === 1 ? (
        <DocumentsStep />
      ) : step === 2 ? (
        <FormationCarousel onAdvanceStep={handleContinue} onGoToPreviousStep={() => setStep(1)} />
      ) : step === 3 ? (
        <QuestionnaireQuiz onFinish={handleQuizFinish} />
      ) : (
        <ValidationSummary
          score={quizResult.score}
          total={quizResult.total}
          onContinue={() => router.push("/driver-pending-validation")}
          onDownloadFormation={() => {}}
          onBackToFormation={() => setStep(2)}
        />
      )}

      {step === 1 ? <PrimaryButton label="Continuer" onPress={handleContinue} /> : null}
    </Screen>
  );
}

function DocumentsStep() {
  return (
    <View style={styles.stepBody}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>
          Devenez <Text style={styles.introTitleAccent}>chauffeur partenaire</Text>
        </Text>
        <Text style={shared.subtitle}>
          Pour garantir la sécurité et la qualité de service, merci de compléter votre inscription en
          3 étapes.
        </Text>
      </View>

      <View style={shared.sectionCard}>
        <Text style={shared.sectionTitle}>Étape 1 : Préparez vos documents</Text>
        <Text style={shared.sectionSubtitle}>Merci de fournir des documents à jour et lisibles.</Text>

        <View style={styles.documentList}>
          <DocumentRow icon="wallet2" title="Permis de conduire" subtitle="Recto verso" onAdd={() => {}} />
          <View style={shared.dividerLine} />
          <DocumentRow
            icon="patch-check"
            title="Attestation d'assurance"
            subtitle="En cours de validité"
            onAdd={() => {}}
          />
          <View style={shared.dividerLine} />
          <DocumentRow
            icon="person"
            title="Pièce d'identité"
            subtitle="Carte d'identité ou passeport"
            onAdd={() => {}}
          />
          <View style={shared.dividerLine} />
          <DocumentRow
            icon="camera"
            title="Photo de profil"
            subtitle="Photo claire de votre visage"
            onAdd={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
  },
  headerSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.accent,
  },
  stepBody: {
    gap: spacing.lg,
  },
  intro: {
    gap: 6,
  },
  introTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  introTitleAccent: {
    color: colors.accent,
  },
  documentList: {
    marginTop: spacing.md,
  },
});

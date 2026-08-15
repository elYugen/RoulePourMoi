import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { QUESTIONNAIRE_QUESTIONS } from "../data/questionnaireQuestions";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { PrimaryButton } from "./PrimaryButton";

type QuestionnaireQuizProps = {
  onFinish: (score: number, total: number) => void;
};

export function QuestionnaireQuiz({ onFinish }: QuestionnaireQuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const question = QUESTIONNAIRE_QUESTIONS[index];
  const isLast = index === QUESTIONNAIRE_QUESTIONS.length - 1;

  const handleNext = () => {
    if (selected === null) return;

    const nextCorrectCount = correctCount + (selected === question.correctIndex ? 1 : 0);

    if (isLast) {
      onFinish(nextCorrectCount, QUESTIONNAIRE_QUESTIONS.length);
      return;
    }
    setCorrectCount(nextCorrectCount);
    setIndex(index + 1);
    setSelected(null);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          Question {index + 1} / {QUESTIONNAIRE_QUESTIONS.length}
        </Text>
      </View>

      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((option, optionIndex) => (
          <QuizOption
            key={option}
            label={option}
            selected={selected === optionIndex}
            onPress={() => setSelected(optionIndex)}
          />
        ))}
      </View>

      <PrimaryButton
        label={isLast ? "Terminer le questionnaire" : "Question suivante"}
        onPress={handleNext}
        disabled={selected === null}
      />
    </View>
  );
}

function QuizOption({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.option, selected && styles.optionSelected]} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.lg,
  },
  badge: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.accent,
  },
  question: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textPrimary,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  optionSelected: {
    borderColor: colors.accent,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  optionText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textPrimary,
  },
});

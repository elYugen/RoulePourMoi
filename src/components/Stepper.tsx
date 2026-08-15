import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import { shared } from "../styles/shared";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <View style={styles.row}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <Fragment key={label}>
            {index > 0 ? (
              <View style={[shared.stepLine, stepNumber <= currentStep && shared.stepLineActive]} />
            ) : null}

            <View style={styles.column}>
              <View
                style={[
                  shared.stepCircle,
                  isCompleted
                    ? shared.stepCircleCompleted
                    : isActive
                      ? shared.stepCircleActive
                      : shared.stepCircleUpcoming,
                ]}
              >
                <Text style={[shared.stepNumber, !isCompleted && !isActive && shared.stepNumberMuted]}>
                  {stepNumber}
                </Text>
              </View>
              <Text
                style={[shared.stepLabel, !isActive && !isCompleted && shared.stepLabelMuted]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {label}
              </Text>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  column: {
    width: 44,
    alignItems: "center",
  },
});

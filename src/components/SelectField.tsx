import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";

type SelectOption<T extends string | number> = {
  label: string;
  value: T;
};

type SelectFieldProps<T extends string | number> = {
  label: string;
  placeholder: string;
  value: T | null;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
};

export function SelectField<T extends string | number>({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
}: SelectFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <>
      <Pressable
        style={[shared.input, styles.field, disabled && styles.fieldDisabled]}
        onPress={() => !disabled && setOpen(true)}
      >
        <Text style={[styles.value, !selected && styles.placeholder]} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
        <View style={styles.chevron}>
          <Icon name="arrow-left" size={14} color={colors.textSecondary} />
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />

        <View style={styles.sheet}>
          <Text style={styles.title}>{label}</Text>

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  style={styles.option}
                  onPress={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option.label}
                  </Text>
                  {isSelected ? <Icon name="check" size={16} color={colors.accent} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldDisabled: {
    opacity: 0.5,
  },
  value: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 17,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textSecondary,
  },
  chevron: {
    transform: [{ rotate: "-90deg" }],
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "70%",
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  optionsList: {
    alignSelf: "stretch",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  optionText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  optionTextSelected: {
    fontFamily: fonts.semiBold,
    color: colors.accent,
  },
});

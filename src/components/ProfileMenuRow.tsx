import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";

type ProfileMenuRowProps = {
  label: string;
  onPress?: () => void;
};

export function ProfileMenuRow({ label, onPress }: ProfileMenuRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.arrow}>
        <Icon name="arrow-left" size={16} color={colors.textPrimary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  arrow: {
    transform: [{ rotate: "180deg" }],
  },
});

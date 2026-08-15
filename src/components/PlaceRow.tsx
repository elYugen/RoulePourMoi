import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";

type PlaceRowProps = {
  label: string;
  address: string;
  onPress?: () => void;
};

export function PlaceRow({ label, address, onPress }: PlaceRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Icon name="house" size={24} color={colors.accent} />
      <View style={styles.textWrap}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 19,
    color: colors.textPrimary,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
});

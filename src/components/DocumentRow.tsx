import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type DocumentRowProps = {
  icon: "wallet2" | "patch-check" | "person" | "camera";
  title: string;
  subtitle: string;
  onAdd?: () => void;
};

export function DocumentRow({ icon, title, subtitle, onAdd }: DocumentRowProps) {
  return (
    <View style={styles.row}>
      <View style={shared.documentIconBox}>
        <Icon name={icon} size={20} color={colors.accent} />
      </View>

      <View style={styles.textWrap}>
        <Text style={shared.cardTitle}>{title}</Text>
        <Text style={shared.cardSubtitle}>{subtitle}</Text>
      </View>

      <Pressable style={shared.addButton} onPress={onAdd}>
        <Icon name="plus" size={12} color={colors.accent} />
        <Text style={shared.addButtonText}>Ajouter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
});

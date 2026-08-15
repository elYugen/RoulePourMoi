import { Text, View } from "react-native";

import { shared } from "../styles/shared";

type DividerProps = {
  label?: string;
};

export function Divider({ label = "OU" }: DividerProps) {
  return (
    <View style={shared.dividerRow}>
      <View style={shared.dividerLine} />
      <Text style={shared.dividerText}>{label}</Text>
      <View style={shared.dividerLine} />
    </View>
  );
}

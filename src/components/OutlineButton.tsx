import { Pressable, Text } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type OutlineButtonProps = {
  label: string;
  icon?: "person" | "steering-wheel";
  onPress?: () => void;
};

export function OutlineButton({ label, icon, onPress }: OutlineButtonProps) {
  return (
    <Pressable style={shared.outlineButton} onPress={onPress}>
      {icon ? <Icon name={icon} size={16} color={colors.accent} /> : null}
      <Text style={shared.outlineButtonText}>{label}</Text>
    </Pressable>
  );
}

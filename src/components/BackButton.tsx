import { Pressable } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type BackButtonProps = {
  onPress?: () => void;
};

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable style={shared.backButton} onPress={onPress}>
      <Icon name="arrow-left" size={18} color={colors.textPrimary} />
    </Pressable>
  );
}

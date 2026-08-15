import { Pressable } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type SocialButtonProps = {
  icon: "facebook" | "apple" | "google";
  onPress?: () => void;
};

export function SocialButton({ icon, onPress }: SocialButtonProps) {
  return (
    <Pressable style={shared.socialCircle} onPress={onPress}>
      <Icon name={icon} size={28} color={colors.textPrimary} />
    </Pressable>
  );
}

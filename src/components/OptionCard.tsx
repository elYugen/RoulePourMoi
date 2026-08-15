import { Pressable, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type OptionCardProps = {
  icon: "person" | "steering-wheel";
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function OptionCard({ icon, title, subtitle, onPress }: OptionCardProps) {
  return (
    <Pressable style={shared.card} onPress={onPress}>
      <View style={shared.cardIconCircle}>
        <Icon name={icon} size={22} color={colors.textPrimary} />
      </View>
      <View style={shared.cardTextWrap}>
        <Text style={shared.cardTitle}>{title}</Text>
        <Text style={shared.cardSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

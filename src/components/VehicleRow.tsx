import { Pressable, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type VehicleRowProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export function VehicleRow({ title, subtitle, onPress }: VehicleRowProps) {
  return (
    <Pressable style={shared.card} onPress={onPress}>
      <View style={shared.cardIconCircle}>
        <Icon name="car-front" size={22} color={colors.accent} />
      </View>
      <View style={shared.cardTextWrap}>
        <Text style={shared.cardTitle}>{title}</Text>
        <Text style={shared.cardSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

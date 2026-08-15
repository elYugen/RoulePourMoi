import { ReactNode } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { shared } from "../styles/shared";

type ScreenProps = {
  children: ReactNode;
  background?: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, background, scroll, contentContainerStyle }: ScreenProps) {
  return (
    <View style={shared.screen}>
      {background}
      <SafeAreaView style={shared.safeArea} edges={["top", "bottom"]}>
        {scroll ? (
          <ScrollView contentContainerStyle={contentContainerStyle}>{children}</ScrollView>
        ) : (
          <View style={contentContainerStyle}>{children}</View>
        )}
      </SafeAreaView>
    </View>
  );
}

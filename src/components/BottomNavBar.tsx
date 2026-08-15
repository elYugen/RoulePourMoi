import { GlassView } from "expo-glass-effect";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../styles/colors";
import { fonts } from "../styles/typography";
import { Icon, IconName } from "./Icon";

type ClientTabKey = "home" | "vehicles" | "profile";
type DriverTabKey = "home" | "courses" | "wallet" | "profile";
type TabKey = ClientTabKey | DriverTabKey;

type Tab = { key: TabKey; label: string; icon: IconName };

const CLIENT_TABS: Tab[] = [
  { key: "home", label: "Accueil", icon: "house" },
  { key: "vehicles", label: "Mes véhicules", icon: "car-front" },
  { key: "profile", label: "Profil", icon: "person" },
];

const DRIVER_TABS: Tab[] = [
  { key: "home", label: "Accueil", icon: "house" },
  { key: "courses", label: "Courses", icon: "car-front" },
  { key: "wallet", label: "Wallet", icon: "wallet2" },
  { key: "profile", label: "Profil", icon: "person" },
];

type BottomNavBarProps = {
  variant?: "client" | "driver";
  active?: TabKey;
  onTabPress?: (tab: TabKey) => void;
};

export function BottomNavBar({ variant = "client", active = "home", onTabPress }: BottomNavBarProps) {
  const tabs = variant === "driver" ? DRIVER_TABS : CLIENT_TABS;

  if (Platform.OS === "ios") {
    return (
      <SafeAreaView edges={["bottom"]}>
        <GlassView style={styles.bar} glassEffectStyle="regular" isInteractive tintColor={colors.background}>
          <TabItems tabs={tabs} active={active} onTabPress={onTabPress} />
        </GlassView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.androidSafeArea}>
      <View style={styles.bar}>
        <TabItems tabs={tabs} active={active} onTabPress={onTabPress} />
      </View>
    </SafeAreaView>
  );
}

type TabItemsProps = {
  tabs: Tab[];
  active: TabKey;
  onTabPress?: (tab: TabKey) => void;
};

function TabItems({ tabs, active, onTabPress }: TabItemsProps) {
  return (
    <>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        const color = isActive ? colors.accent : colors.textPrimary;

        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onTabPress?.(tab.key)}>
            <Icon name={tab.icon} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  bar: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});

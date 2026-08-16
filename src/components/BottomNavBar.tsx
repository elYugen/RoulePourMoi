import { GlassView } from "expo-glass-effect";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { spacing } from "../styles/spacing";
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
      <SafeAreaView edges={["bottom"]} style={styles.floatingWrapper} pointerEvents="box-none">
        <GlassView
          style={[styles.bar, styles.barGlass]}
          glassEffectStyle="regular"
          isInteractive
          tintColor={colors.background}
        >
          <TabItems tabs={tabs} active={active} onTabPress={onTabPress} />
        </GlassView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.floatingWrapper} pointerEvents="box-none">
      <View style={[styles.bar, styles.barSolid]}>
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
        const color = isActive ? colors.accent : colors.textSecondary;

        return (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
            onPress={() => onTabPress?.(tab.key)}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Icon name={tab.icon} size={20} color={color} />
            </View>
            <Text style={[styles.label, { color }, isActive && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  bar: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.xl,
  },
  barGlass: {
    overflow: "hidden",
  },
  barSolid: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    paddingVertical: 2,
  },
  tabPressed: {
    opacity: 0.6,
  },
  iconWrap: {
    width: 40,
    height: 30,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: colors.iconCircle,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  labelActive: {
    fontFamily: fonts.semiBold,
  },
});

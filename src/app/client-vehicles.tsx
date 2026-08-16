import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddVehicleModal, NewVehicle } from "../components/AddVehicleModal";
import { BottomNavBar } from "../components/BottomNavBar";
import { Icon } from "../components/Icon";
import { VehicleRow } from "../components/VehicleRow";
import { CLIENT_VEHICLES } from "../data/vehicles";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

export default function ClientVehicles() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(CLIENT_VEHICLES);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const handleAddVehicle = (vehicle: NewVehicle) => {
    setVehicles((current) => [...current, { id: Date.now().toString(), ...vehicle }]);
    setAddModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mes véhicules</Text>
            <Pressable style={styles.addButton} onPress={() => setAddModalVisible(true)}>
              <Icon name="plus" size={18} color={colors.textPrimary} />
            </Pressable>
          </View>

          <View style={styles.list}>
            {vehicles.map((vehicle) => (
              <VehicleRow key={vehicle.id} name={vehicle.name} plate={vehicle.plate} onPress={() => {}} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar
        active="vehicles"
        onTabPress={(tab) => {
          if (tab === "home") router.push("/client-home");
          if (tab === "profile") router.push("/client-profile");
        }}
      />

      <AddVehicleModal
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddVehicle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 110,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    gap: spacing.md,
  },
});

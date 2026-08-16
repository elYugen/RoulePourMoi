import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddVehicleModal } from "../components/AddVehicleModal";
import { BottomNavBar } from "../components/BottomNavBar";
import { Icon } from "../components/Icon";
import { VehicleRow } from "../components/VehicleRow";
import { getErrorMessage } from "../services/errors";
import { listVehicleBrands, listVehicleTypes, listVehicles } from "../services/vehiclesApi";
import type { Vehicle, VehicleBrand, VehicleType } from "../schemas/vehicles";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

export default function ClientVehicles() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [brands, setBrands] = useState<VehicleBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setErrorMessage(null);
      setLoading(true);
      try {
        const [vehiclesData, typesData, brandsData] = await Promise.all([
          listVehicles(),
          listVehicleTypes(),
          listVehicleBrands(),
        ]);
        if (!cancelled) {
          setVehicles(vehiclesData);
          setVehicleTypes(typesData);
          setBrands(brandsData);
        }
      } catch (error) {
        if (!cancelled) setErrorMessage(getErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const handleCreated = (vehicle: Vehicle) => {
    setVehicles((current) => [vehicle, ...current]);
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

          {loading ? (
            <ActivityIndicator color={colors.accent} style={styles.stateBlock} />
          ) : errorMessage ? (
            <View style={styles.stateBlock}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <Pressable onPress={() => setReloadToken((token) => token + 1)}>
                <Text style={styles.retryText}>Réessayer</Text>
              </Pressable>
            </View>
          ) : vehicles.length === 0 ? (
            <View style={styles.stateBlock}>
              <Text style={styles.emptyText}>
                Vous n&apos;avez pas encore ajouté de véhicule. Appuyez sur + pour en ajouter un.
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {vehicles.map((vehicle) => (
                <VehicleRow
                  key={vehicle.id}
                  title={`${vehicle.brand.name} ${vehicle.model.name}`}
                  subtitle={`${vehicle.registration} · ${vehicle.color}`}
                  onPress={() => {}}
                />
              ))}
            </View>
          )}
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
        vehicleTypes={vehicleTypes}
        brands={brands}
        onClose={() => setAddModalVisible(false)}
        onCreated={handleCreated}
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
  stateBlock: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.brandRed,
    textAlign: "center",
  },
  retryText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.accent,
  },
});

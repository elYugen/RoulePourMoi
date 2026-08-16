import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavBar } from "../components/BottomNavBar";
import { LocationMap } from "../components/LocationMap";
import { PlaceRow } from "../components/PlaceRow";
import { SAVED_PLACES } from "../data/savedPlaces";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

export default function ClientHome() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { coords, loading, errorMessage } = useCurrentLocation();
  const mapHeight = Math.round(height * 0.38);

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour,{"\n"}Où allez-vous ?</Text>
        </View>
      </SafeAreaView>

      <View style={[styles.mapWrapper, { height: mapHeight }]}>
        {coords ? (
          <LocationMap coords={coords} style={StyleSheet.absoluteFill} />
        ) : (
          <View style={styles.mapFallback}>
            {loading ? (
              <ActivityIndicator color={colors.accent} />
            ) : (
              <Text style={styles.mapFallbackText}>{errorMessage ?? "Position indisponible."}</Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.sheet}>
        <Pressable style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Où allez-vous ?</Text>
        </Pressable>

        <View style={styles.placesList}>
          {SAVED_PLACES.map((place, index) => (
            <View key={place.id}>
              {index > 0 ? <View style={shared.dividerLine} /> : null}
              <PlaceRow label={place.label} address={place.address} onPress={() => {}} />
            </View>
          ))}
        </View>
      </View>

      <BottomNavBar
        active="home"
        onTabPress={(tab) => {
          if (tab === "vehicles") router.push("/client-vehicles");
          if (tab === "profile") router.push("/client-profile");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.textPrimary,
  },
  mapWrapper: {
    backgroundColor: colors.surface,
  },
  mapFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapFallbackText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  sheet: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 110,
  },
  searchBar: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
  },
  searchPlaceholder: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.textSecondary,
  },
  placesList: {
    marginTop: spacing.sm,
  },
});

import { useRouter } from "expo-router";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";

import { BottomBackgroundImage } from "../components/BottomBackgroundImage";
import { Divider } from "../components/Divider";
import { OptionCard } from "../components/OptionCard";
import { OutlineButton } from "../components/OutlineButton";
import { Screen } from "../components/Screen";
import { spacing } from "../styles/spacing";

const LOGO_RATIO = 913 / 543;
const BACKGROUND_RATIO = 1536 / 1024;

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const logoWidth = Math.min(width * 0.56, 240);
  const logoHeight = logoWidth / LOGO_RATIO;

  return (
    <Screen
      background={
        <BottomBackgroundImage
          source={require("../../assets/images/background-voiture-black.png")}
          ratio={BACKGROUND_RATIO}
          scale={1.3}
          shiftX={25}
        />
      }
      contentContainerStyle={styles.content}
    >
      <Image
        source={require("../../assets/images/logo-big.png")}
        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
        resizeMode="contain"
      />

      <View style={styles.cardsGroup}>
        <OptionCard icon="person" title="Je suis client" subtitle="Réserver un trajet" onPress={() => {}} />
        <OptionCard
          icon="steering-wheel"
          title="Je suis chauffeur"
          subtitle="Commencer à conduire"
          onPress={() => router.push("/driver-login")}
        />
      </View>

      <Divider />

      <OutlineButton icon="person" label="Se connecter" onPress={() => router.push("/login")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 10,
    justifyContent: "flex-start",
    gap: spacing.xl,
  },
  logo: {
    alignSelf: "center",
  },
  cardsGroup: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
});

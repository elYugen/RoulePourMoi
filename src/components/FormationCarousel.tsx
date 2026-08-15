import { useRef, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { FORMATION_SLIDES, FormationSlide } from "../data/formationSlides";
import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { PrimaryButton } from "./PrimaryButton";

type FormationCarouselProps = {
  onAdvanceStep: () => void;
  onGoToPreviousStep: () => void;
};

export function FormationCarousel({ onAdvanceStep, onGoToPreviousStep }: FormationCarouselProps) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const slideWidth = width - spacing.lg * 2;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(FORMATION_SLIDES.length - 1, next));
    setIndex(clamped);
    scrollRef.current?.scrollTo({ x: clamped * slideWidth, animated: true });
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / slideWidth));
  };

  const handlePrevious = () => {
    if (index === 0) {
      onGoToPreviousStep();
      return;
    }
    goTo(index - 1);
  };

  const handleNext = () => {
    if (index === FORMATION_SLIDES.length - 1) {
      onAdvanceStep();
      return;
    }
    goTo(index + 1);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {FORMATION_SLIDES.map((slide) => (
          <View key={slide.id} style={{ width: slideWidth }}>
            <SlideCard slide={slide} />
          </View>
        ))}
      </ScrollView>

      <View style={shared.dotsRow}>
        {FORMATION_SLIDES.map((slide, i) => (
          <View key={slide.id} style={[shared.dot, i === index && shared.dotActive]} />
        ))}
      </View>

      <View style={shared.navRow}>
        <Pressable style={shared.secondaryButton} onPress={handlePrevious}>
          <Text style={shared.secondaryButtonText}>Précédent</Text>
        </Pressable>
        <PrimaryButton
          style={styles.nextButton}
          label={index === FORMATION_SLIDES.length - 1 ? "Terminer" : "Suivant"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

function SlideCard({ slide }: { slide: FormationSlide }) {
  return (
    <View style={styles.slide}>
      {slide.brandTitle ? (
        <Text style={styles.title}>
          Bienvenue chez{"\n"}
          <Text style={{ color: colors.textPrimary }}>Roule</Text>
          <Text style={{ color: colors.brandRed }}>Pour</Text>
          <Text style={{ color: colors.textPrimary }}>Moi</Text>
        </Text>
      ) : (
        <Text style={styles.title}>{slide.title}</Text>
      )}

      <Text style={shared.subtitle} numberOfLines={4}>
        {slide.body}
      </Text>

      <Image
        source={require("../../assets/images/background-voiture-black.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={shared.sectionCard}>
        <Text style={shared.cardTitle}>{slide.highlightTitle}</Text>
        <Text style={shared.cardSubtitle} numberOfLines={3}>
          {slide.highlightBody}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.md,
  },
  slide: {
    gap: spacing.md,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 16,
  },
  nextButton: {
    flex: 1,
    alignSelf: "auto",
  },
});

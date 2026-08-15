import { Image, ImageSourcePropType, StyleSheet, useWindowDimensions } from "react-native";

type BottomBackgroundImageProps = {
  source: ImageSourcePropType;
  ratio: number;
  scale?: number;
  shiftX?: number;
};

export function BottomBackgroundImage({ source, ratio, scale = 1, shiftX = 0 }: BottomBackgroundImageProps) {
  const { width } = useWindowDimensions();
  const imageWidth = width * scale;
  const imageHeight = imageWidth / ratio;

  return (
    <Image
      source={source}
      resizeMode="cover"
      style={[
        styles.image,
        { width: imageWidth, height: imageHeight, left: -(imageWidth - width) / 2 + shiftX },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    bottom: 0,
  },
});

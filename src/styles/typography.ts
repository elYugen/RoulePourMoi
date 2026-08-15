export const fonts = {
  thin: "Raleway-Thin",
  extraLight: "Raleway-ExtraLight",
  light: "Raleway-Light",
  regular: "Raleway-Regular",
  medium: "Raleway-Medium",
  semiBold: "Raleway-SemiBold",
  bold: "Raleway-Bold",
  extraBold: "Raleway-ExtraBold",
  black: "Raleway-Black",
} as const;

export const fontMap = {
  [fonts.thin]: require("../../assets/fonts/Raleway-Thin.ttf"),
  [fonts.extraLight]: require("../../assets/fonts/Raleway-ExtraLight.ttf"),
  [fonts.light]: require("../../assets/fonts/Raleway-Light.ttf"),
  [fonts.regular]: require("../../assets/fonts/Raleway-Regular.ttf"),
  [fonts.medium]: require("../../assets/fonts/Raleway-Medium.ttf"),
  [fonts.semiBold]: require("../../assets/fonts/Raleway-SemiBold.ttf"),
  [fonts.bold]: require("../../assets/fonts/Raleway-Bold.ttf"),
  [fonts.extraBold]: require("../../assets/fonts/Raleway-ExtraBold.ttf"),
  [fonts.black]: require("../../assets/fonts/Raleway-Black.ttf"),
};

import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";

type TextFieldProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

export function TextField({ style, ...props }: TextFieldProps) {
  return (
    <TextInput placeholderTextColor={colors.textSecondary} style={[shared.input, style]} {...props} />
  );
}

import { Pressable } from "react-native";

import { colors } from "../styles/colors";
import { shared } from "../styles/shared";
import { Icon } from "./Icon";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      style={[shared.checkboxBox, checked && shared.checkboxBoxChecked]}
      onPress={() => onChange(!checked)}
    >
      {checked ? <Icon name="check" size={14} color={colors.textPrimary} /> : null}
    </Pressable>
  );
}

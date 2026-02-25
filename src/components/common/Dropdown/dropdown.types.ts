export interface DropdownMenuItem {
  value: unknown;
  id: string;
  text: string;
  secondaryText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
}


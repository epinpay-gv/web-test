export interface DropdownMenuItem {
  id: string;
  text: string;
  secondaryText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
}


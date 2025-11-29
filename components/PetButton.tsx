import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { ActionType } from "@/lib/types";

type PetButtonProps = {
  actionType: ActionType;
  children: React.ReactNode;
  disabled: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Variant = VariantProps<typeof buttonVariants>["variant"];

type Size = VariantProps<typeof buttonVariants>["size"];

const config = {
  add: { variant: "default", size: "icon" },
  edit: { variant: "secondary", size: "default" },
  checkout: { variant: "secondary", size: "default" },
} satisfies Record<
  PetButtonProps["actionType"],
  { variant: Variant; size: Size }
>;

export default function PetButton({
  actionType,
  children,
  disabled = false,
  className,
  onClick,
}: PetButtonProps) {
  const { variant, size } = config[actionType];

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

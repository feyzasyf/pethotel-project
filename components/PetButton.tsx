import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children: React.ReactNode;
  className?: string;
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
  className,
}: PetButtonProps) {
  const { variant, size } = config[actionType];
  type User = { name: string };

  const obj = { name: "Alice", age: 20 };

  const user: User = obj; // ✔ allowed, age is silently dropped
  console.log(user);
  return (
    <Button variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}

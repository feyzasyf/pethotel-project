import { AddEditAction } from "@/lib/types";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: AddEditAction;
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="rounded-full justify-self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}

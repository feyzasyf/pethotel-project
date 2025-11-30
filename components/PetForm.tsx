import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ActionResult, Pet } from "@/lib/types";
import { addPet, editPet, PetInput } from "@/actions";
import PetFormBtn from "./PetFormBtn";
import { toast } from "sonner";
import { useActionState } from "react";
import { usePetContext } from "@/lib/hooks";

export default function PetForm({
  actionType,
  pet,
  onFormSubmission,
}: {
  actionType: "add" | "edit";
  pet?: Pet;
  onFormSubmission: () => void;
}) {
  const { handleAddPet, handleEditPet } = usePetContext();
  const handleSubmit = async (
    prevState: ActionResult<null> | undefined,
    formData: FormData
  ) => {
    onFormSubmission();

    const petData: Omit<Pet, "id"> = {
      //id: new Date().toISOString(),
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://placedog.net/200/300?id=33",
      age: Number(formData.get("age")) as number,
      notes: formData.get("notes") as string,
    };

    const result =
      actionType === "add"
        ? await handleAddPet(petData)
        : await handleEditPet(pet!.id, petData);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    return result;
  };
  const initialState: ActionResult<null> = {
    success: false,
    data: null,
    error: null,
  };
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            defaultValue={pet?.name}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            defaultValue={pet?.ownerName}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={pet?.imageUrl}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            defaultValue={pet?.age}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={pet?.notes}
            required
          />
        </div>

        {/* <Button variant="outline">Cancel</Button> */}

        <PetFormBtn actionType={actionType} pending={isPending} />
      </div>
    </form>
  );
}

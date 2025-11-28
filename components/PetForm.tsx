import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ActionResult, Pet } from "@/lib/types";
import { addPet } from "@/actions";
import PetFormBtn from "./PetFormBtn";
import { toast } from "sonner";
import { useActionState } from "react";

export default function PetForm({
  actionType,
  pet,
  onFormSubmission,
}: {
  actionType: "add" | "edit";
  pet?: Pet;
  onFormSubmission: () => void;
}) {
  const handleSubmit = async (
    prevState: ActionResult<null> | undefined,
    formData: FormData
  ) => {
    const result = await addPet(formData);
    console.log(formData);
    console.log(state);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    onFormSubmission();
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

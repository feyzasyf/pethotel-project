import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pet } from "@/lib/types";
import { addPet } from "@/actions";
import PetFormBtn from "./PetFormBtn";
import { toast } from "sonner";

export default function PetForm({
  actionType,
  pet,
  onFormSubmission,
}: {
  actionType: "add" | "edit";
  pet?: Pet;
  onFormSubmission: () => void;
}) {
  return (
    <form
      action={async (formData: FormData) => {
        const result = await addPet(formData);
        if (result.success === "false") {
          toast.warning(result.error || "Something went wrong");
        }
        onFormSubmission();
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            defaultValue="Pedro Duarte"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            defaultValue="Pedro Duarte"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue="@peduarte"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" name="age" defaultValue="3" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue="@peduarte"
            required
          />
        </div>

        {/* <Button variant="outline">Cancel</Button> */}

        <PetFormBtn actionType={actionType} />
      </div>
    </form>
  );
}

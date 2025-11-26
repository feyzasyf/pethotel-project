import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pet } from "@/lib/types";
import { Button } from "./ui/button";

import { addPet } from "@/actions";

export default function PetForm({
  actionType,
  pet,
}: {
  actionType: "add" | "edit";
  pet?: Pet;
}) {
  return (
    <form action={addPet}>
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

        <Button type="submit" className="rounded-full justify-self-end">
          {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>
      </div>
    </form>
  );
}

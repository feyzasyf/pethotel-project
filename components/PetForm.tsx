import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AddEditAction } from "@/lib/types";
import { Pet } from "@/app/generated/prisma/client";
import PetFormBtn from "./PetFormBtn";
import { toast } from "sonner";
import { usePetContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, TPetForm, TPetFormInput } from "@/lib/validations";

export default function PetForm({
  actionType,
  pet,
  onFormSubmission,
}: {
  actionType: AddEditAction;
  pet?: Pet;
  onFormSubmission: () => void;
}) {
  const { handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TPetFormInput, TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name,
      ownerName: pet?.ownerName,
      imageUrl: pet?.imageUrl,
      age: pet?.age,
      notes: pet?.notes,
    },
  });
  const onSubmit = async (data: TPetFormInput) => {
    const res = await trigger();
    if (!res) return;

    onFormSubmission();

    const petData = petFormSchema.parse(data);

    const result =
      actionType === "add"
        ? await handleAddPet(petData)
        : await handleEditPet(pet!.id, petData);

    if (result.error) {
      toast.error(result.error);
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-sm text-red-600">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>

        <PetFormBtn actionType={actionType} />
      </div>
    </form>
  );
}

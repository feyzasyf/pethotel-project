export type Pet = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export const actionTypes = ["add", "edit", "checkout"] as const;
export type ActionType = (typeof actionTypes)[number];

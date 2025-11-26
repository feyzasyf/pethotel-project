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

export type ActionResult<T> =
  | { success: "true"; data: T }
  | { success: "false"; error: string };

export type TTask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

export type TTaskConstructor = { [P in keyof TTask]+?: TTask[P] };
export type TTaskUpdate = { [P in keyof Omit<TTask, 'id'>]+?: TTask[P] };

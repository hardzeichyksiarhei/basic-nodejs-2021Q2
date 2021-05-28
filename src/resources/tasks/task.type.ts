export type IBaseTask = {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

export interface IBaseTaskPartial extends Partial<IBaseTask> {}
export interface IBaseTaskResponse extends IBaseTask {
  id: string;
}

export interface ITask extends IBaseTask {
  id: string;

  update(payload: IBaseTaskPartial): Promise<ITask>;
}

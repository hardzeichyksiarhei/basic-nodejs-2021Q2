export interface IBaseColumn {
  title: string;
  order: number;
}

export interface IBaseColumnPartial extends Partial<IBaseColumn> {}

export interface IColumn extends IBaseColumn {
  id: string;
}

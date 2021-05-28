import { IColumn } from '../columns/column.type';

export interface IBaseBoard {
  title: string;
  columns: IColumn[];
}

export interface IBaseBoardPartial extends Partial<IBaseBoard> {}
export interface IBaseBoardResponse extends IBaseBoard {
  id: string;
}

export interface IBoard extends IBaseBoard {
  id: string;

  update(payload: IBaseBoardPartial): Promise<IBoard>;
}

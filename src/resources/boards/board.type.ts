import { TColumn } from '../columns/column.type';

export type TBoard = {
  id: string;
  title: string;
  columns: TColumn[];
};

export type TBoardConstructor = { [P in keyof TBoard]+?: TBoard[P] };
export type TBoardUpdate = { [P in keyof Omit<TBoard, 'id'>]+?: TBoard[P] };

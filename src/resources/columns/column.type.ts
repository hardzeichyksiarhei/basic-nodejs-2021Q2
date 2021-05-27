export type TColumn = {
  id: string;
  title: string;
  order: number;
};

export type TColumnConstructor = { [P in keyof TColumn]+?: TColumn[P] };

/**
 * @file   This file define the Column class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Columns
 */

import { v4 as uuid } from 'uuid';

import { IColumn, IBaseColumn } from './column.type';

/** Class representing a Column model */
class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * Creates a column instance
   * @param column The column object
   */
  constructor({ id = uuid(), title = 'COLUMN', order = -1 }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Creates a column instance
   * @param payload The column object for create
   * @returns The column object
   */
  static async create(payload: IBaseColumn): Promise<IColumn> {
    return new Column(payload);
  }
}

export default Column;

/**
 * @file   This file define the Column class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Columns
 */

import { v4 as uuid } from 'uuid';

import { TColumn, TColumnConstructor } from './column.type';

interface IColumn {
  id: string;
  title: string;
  order: number;
}

/** Class representing a Column model */
class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * Creates a column instance
   * @param {TColumn} column The column object
   */
  constructor({
    id = uuid(),
    title = 'COLUMN',
    order = -1,
  }: TColumnConstructor = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Creates a column instance
   * @async
   *
   * @param {TColumn} payload The column object for create
   * @returns {Promise<TColumn>} The column object
   */
  static async create(payload: TColumn): Promise<TColumn> {
    return new Column(payload);
  }

  /**
   * Creates a column instance
   * @param {TColumn} payload The column object for create
   * @returns {TColumn} The column object
   */
  static createSync(payload: TColumn): TColumn {
    return new Column(payload);
  }
}

export default Column;

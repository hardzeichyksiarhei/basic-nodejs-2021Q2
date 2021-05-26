/**
 * @file   This file define the Column class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Columns
 */

const { v4: uuid } = require('uuid');

/** Class representing a Column model */
class Column {
  /**
   * Creates a column instance
   * @param {TColumn} column The column object
   */
  constructor({ id = uuid(), title = 'COLUMN', order = -1 } = {}) {
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
  static async create(payload) {
    return new Column(payload);
  }

  /**
   * Creates a column instance
   * @param {TColumn} payload The column object for create
   * @returns {TColumn} The column object
   */
  static createSync(payload) {
    return new Column(payload);
  }
}

module.exports = Column;

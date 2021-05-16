const { v4: uuid } = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = -1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static async create(payload) {
    return new Column(payload);
  }

  static createSync(payload) {
    return new Column(payload);
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Column;

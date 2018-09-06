/**
 * Book Entity (ES6 Class)
 */

class Transaction {
    constructor(id, userId, bookId, takenAt, returnedAt) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.takenAt = takenAt;
        this.returnedAt = returnedAt;
    }
  }
  
  module.exports = Transaction;
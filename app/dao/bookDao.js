/* Load Book entity */
const Book = require('../model/book');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Book Data Access Object
 */
class BookDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, title FROM book WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Book(row.id, row.title));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM book";
        return this.common.findAll(sqlRequest).then(rows => {
            let books = [];
            for (const row of rows) {
                books.push(new Book(row.id, row.title));
            }
            return books;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM book";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Book
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Book) {
        let sqlRequest = "UPDATE book SET " +
            "title=$title " +
            "WHERE id=$id";

        let sqlParams = {
            $title: Book.title,
            $id: Book.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Book
     * returns database insertion status
     */
    create(Book) {
        let sqlRequest = "INSERT into book (title) " +
            "VALUES ($title)";
        let sqlParams = {
            $title: Book.title
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Book
     * returns database insertion status
     */
    createWithId(Book) {
        let sqlRequest = "INSERT into book (id, title) " +
            "VALUES ($id, $title)";
        let sqlParams = {
            $id: Book.id,
            $title: Book.title
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM book WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM book WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = BookDao;
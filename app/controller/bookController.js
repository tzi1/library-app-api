/* Load Book Data Access Object */
const BookDao = require('../dao/bookDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Book entity */
const Book = require('../model/book');

/**
 * Book Controller
 */
class BookController {

    constructor() {
        this.bookDao = new BookDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
      let id = req.params.id;
      
      this.bookDao.findById(id)
          .then(this.common.findSuccess(res))
          .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.bookDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {
        this.bookDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let book = new Book();
        return this.bookDao.update(book)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let book = new Book();
        if (req.body.id) {
            book.id = req.body.id;
        }
        book.title = req.body.title;

        if (req.body.id) {
            return this.bookDao.createWithId(book)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.bookDao.create(book)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.bookDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.bookDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = BookController;
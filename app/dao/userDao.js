/* Load User entity */
const User = require('../model/user');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * User Data Access Object
 */
class UserDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, firstName, lastName, alias, photoPath FROM user WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.firstName, row.lastName, row.alias, row.photoPath));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM user";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User(row.id, row.firstName, row.lastName, row.alias, row.photoPath));
            }
            return users;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM user";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params User
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(User) {
        let sqlRequest = "UPDATE user SET " +
            "firstName=$firstName, " +
            "lastName=$lastName " +
            "WHERE id=$id";

        let sqlParams = {
            $firstName: User.firstName,
            $lastName: User.lastName,
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params User
     * returns database insertion status
     */
    create(User) {
        let sqlRequest = "INSERT into user (firstName, lastName) " +
            "VALUES ($firstName, $lastName)";
        let sqlParams = {
            $firstName: User.firstName,
            $lastName: User.lastName,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params User
     * returns database insertion status
     */
    createWithId(User) {
        let sqlRequest = "INSERT into user (id, firstName, lastName) " +
            "VALUES ($id, $firstName, $lastName)";
        let sqlParams = {
            $id: User.id,
            $firstName: User.firstName,
            $lastName: User.lastName
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM user WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM user WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    findTakenBooks(id) {
      let sqlRequest = "select t.bookId, b.title, t.takenAt from `transaction` t join `book` b on b.id = t.bookId where t.userId=$id and t.returnedAt is null";
      let sqlParams = {$id: id};
      return this.common.findAll(sqlRequest, sqlParams);
    }
}

module.exports = UserDao;
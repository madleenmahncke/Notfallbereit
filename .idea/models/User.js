/**
 * represents an user
 */
class User {
    constructor(id, email, passwordHash) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}

module.exports = User;
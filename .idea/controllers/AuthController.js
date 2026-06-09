const userRepository = require('../database/UserRepository');
// for hashing passwords
const bcrypt = require('bcrypt');
// for validating e-mails to follow e-mail pattern
const validator = require('validator');

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            error: 'Ungültige E-Mail-Adresse'
        })
    }

    // hashes a password
    const hashedPassword = await bcrypt.hash(
        password,
        // TODO: explaining what salt means
        12
    );

    const userId = await userRepository.createUser(
        email,
        hashedPassword,
    );

    res.status(200).json({
        message: 'Benutzer erstellt',
        id: userId
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(
        email,
    )

    if (!user) {
        return res.status(404).json({
            message: 'E-Mail oder Passwort sind falsch'
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!validPassword) {
        return res.status(401).json({
            message: 'E-Mail oder Passwort sind falsch'
        });
    }

    res.status(200).json({
        message: 'Benutzer eingeloggt',
        id: user.id
    })
}

module.exports = {
    register,
    login
};
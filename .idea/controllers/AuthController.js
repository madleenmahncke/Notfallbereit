const userRepository = require('../database/UserRepository');

// for hashing passwords
const bcrypt = require('bcrypt');

// for validating e-mails to follow e-mail pattern
const validator = require('validator');

// checking for a safe password     Quelle: ChatGPT
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            error: 'Ungültige E-Mail-Adresse'
        })
    }

    // validates the given password for safety
    if (!validator.isStrongPassword(password, {
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,

    })) {
        return res.status(400).send({
            message: 'Passwort erfüllt die Anforderungen nicht! Das Passwort muss mindestens 12 Zeichen, jeweils einen Klein- und Großbuchstaben sowie jeweils mindestens ein Sonderzeichen und eine Zahl enthalten!'
        });
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
const userRepository = require('../database/UserRepository');
const emergencyProfileRepository = require('../database/emergencyProfileRepository');
// for tokens
const jwt = require("jsonwebtoken");
// for hashing passwords
const bcrypt = require('bcrypt');

// for validating e-mails to follow e-mail pattern
const validator = require('validator');

// checking for a safe password     Quelle: ChatGPT
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

const register = async (req, res) => {
    const {email, password, repeatedPassword} = req.body;
    const user = await userRepository.findByEmail(email);

    if (user) {
        return res.status(400).json({
            message: 'E-Mail-Adresse ist bereits vergeben.'
        })
    };

    if (password !== repeatedPassword) {
        return res.status(400).json({
            message: 'Passwörter stimmen nicht überein.'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: 'Ungültige E-Mail-Adresse'
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
            message: 'Passwort erfüllt die Anforderungen nicht! Das Passwort muss mindestens 12 Zeichen, jeweils einen ' +
                'Klein- und Großbuchstaben sowie jeweils mindestens ein Sonderzeichen und eine Zahl enthalten!'
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
        hashedPassword
    );

    res.status(200).json({
        message: 'Benutzer erstellt.',
        id: userId
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepository.findByEmail(email);
    let hasEmergencyProfile;
    let emergencyProfileId;

    if (!user) {
        return res.status(404).json({
            message: 'E-Mail oder Passwort sind falsch.'
        });
    };

    const validPassword = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!validPassword) {
        return res.status(401).json({
            message: 'E-Mail oder Passwort sind falsch.'
        });
    };

    const emergencyProfile = await emergencyProfileRepository.findByUserId(user.id);

    if (!emergencyProfile) {
        hasEmergencyProfile = false;
        emergencyProfileId = null
    } else {
        hasEmergencyProfile = true;
        emergencyProfileId = emergencyProfile.id
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.status(200).json({
        message: 'Benutzer eingeloggt',
        userId: user.id,
        hasEmergencyProfile: hasEmergencyProfile,
        emergencyProfileId: emergencyProfileId,
        role: user.role,
        mustChangePassword: user.must_change_password,
        token: token
    });
}

const createParamedic = async (req, res) => {
    const {email, paramedicCode} = req.body;
    const user = await userRepository.findByEmail(email);

    if (user) {
        return res.status(400).json({
            message: 'E-Mail-Adresse ist bereits vergeben.'
        })
    };

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: 'Ungültige E-Mail-Adresse.'
        })
    }

    // this if statement is build by ChatGPT
    if (!/^\d{6}$/.test(String(paramedicCode))) {
        return res.status(400).send({
            message: 'Kein gültiger Zugehörigkeitscode.',
        })
    }

    const temporaryPassword = Math.random().toString(36).slice(-10);

    // hashes a password
    const hashedPassword = await bcrypt.hash(
        temporaryPassword,
        // TODO: explaining what salt means
        12
    );

    const userId = await userRepository.createParamedic(
        email,
        hashedPassword,
        paramedicCode,
    );

    res.status(200).json({
        message: 'Rettungssanitäter/in erstellt.',
        id: userId,
        temporaryPassword: temporaryPassword,
    });
};

module.exports = {
    register,
    login,
    createParamedic,
};
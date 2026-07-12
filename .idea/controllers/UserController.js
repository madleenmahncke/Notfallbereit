const userRepository = require('../database/UserRepository');
// for hashing passwords
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    const id = req.user.id;
    const {email, password} = req.body;
    const user = await userRepository.findById(id);

    // checks if user exists
    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden'
        });
    };

    // hashes a password
    const hashedPassword = await bcrypt.hash(
        password,
        // TODO: explaining what salt means
        12
    );

    const userId = await userRepository.updateUser(
        id,
        email,
        hashedPassword,
    );

    res.status(200).json({
        message: 'Benutzer aktualisiert.',
        id: userId
    });
}

const deleteUser = async (req, res) => {
    const id = req.user.id;
    const user = await userRepository.findById(id);

    // checks if user exists
    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden'
        });
    };

    const userId = await userRepository.deleteUser(
        id
    );

    return res.status(200).json({
        message: 'Benutzer wurde gelöscht'
    });
}

const getUser = async (req, res) => {
    const userId = req.user.id;

    const user = await userRepository.findById(userId);

    // checks if user exists
    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden'
        });
    };

    const eMail = await userRepository.getEMail(
        userId
    );

    return res.status(201).json({
        message: 'Benutzer gefunden.',
        eMail: eMail,
        userId: userId,
    });
}

module.exports = {
    updateUser,
    deleteUser,
    getUser
};
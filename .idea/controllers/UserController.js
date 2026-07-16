const userRepository = require('../database/UserRepository');
// for hashing passwords
const bcrypt = require('bcrypt');

/**
 * Updates an existing user
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
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

    // trim removes spaces in beginning and end
    const trimmedEMail = email?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedEMail || !trimmedPassword) {
        return res.status(400).send({
            message: 'E-Mail und Passwort werden benötigt.',
        })
    };

    // hashes a password
    const hashedPassword = await bcrypt.hash(
        trimmedPassword,
        // salt rounds
        12
    );

    const userId = await userRepository.updateUser(
        id,
        trimmedEMail,
        hashedPassword,
    );

    res.status(200).json({
        message: 'Benutzer aktualisiert.',
        id: userId
    });
}

/**
 * Deletes an existing user
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
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

/**
 * Gets an exisiting user
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
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
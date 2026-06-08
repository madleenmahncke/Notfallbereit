const userRepository = require('../database/UserRepository');
// for hashing passwords
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

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
        message: 'Benutzer geupdated',
        id: userId
    });
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await userRepository.findById(id);

    // checks if user exists
    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden'
        });
    }

    // checks if password is correct in order to delete the account
    const validPassword = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!validPassword) {
        return res.status(401).json({
            message: 'Passwort ist nicht korrekt'
        });
    }

    const userId = await userRepository.deleteUser(
        id
    )

    return res.status(200).json({
        message: 'Benutzer wurde gelöscht'
    });
}

module.exports = {
    updateUser,
    deleteUser
};
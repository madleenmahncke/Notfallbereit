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

module.exports = {
    updateUser
};
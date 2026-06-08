const userRepository = require('../database/UsersRepository');

const register = async (req, res) => {
    const { email, password } = req.body;

    const userId = await userRepository.createUser(
        email,
        password
    );

    res.status(201).json({
        message: 'User erstellt',
        id: userId
    });
};

module.exports = {
    register
};
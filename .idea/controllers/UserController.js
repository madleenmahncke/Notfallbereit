const getUser = async (req, res) => {

    const userId = req.params.id;

    res.status(200).json({
        id: userId,
        firstName: "Max",
        lastName: "Mustermann",
        email: "max@example.de"
    });

};

const updateUser = async (req, res) => {

    const userId = req.params.id;
    const userData = req.body;

    res.status(200).json({
        message: "Benutzer aktualisiert",
        userId: userId,
        data: userData
    });

};

const deleteUser = async (req, res) => {

    const userId = req.params.id;

    res.status(200).json({
        message: `Benutzer ${userId} gelöscht`
    });

};

module.exports = {
    getUser,
    updateUser,
    deleteUser
};
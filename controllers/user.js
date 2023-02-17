const { User } = require('../models');

module.exports = {
    getUser(req, res) {
        User.find()
            //   .populate({ path: 'tags', select: '-__v' })
            .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            //   .populate({ path: 'tags', select: '-__v' })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then((result) =>
                !result
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(result)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.updateOne({ _id: req.params.userId },
            { $set: { username: req.body.username } }
        )
            .then((result) =>
                !result
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(result)
            )
            .catch((err) => res.status(500).json(err));
    }
};
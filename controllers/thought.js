const { User, Thought } = require('../models');
const user = require('./user');

module.exports = {
    getThought(req, res) {
        Thought.find()
            //   .populate({ path: 'tags', select: '-__v' })
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            //   .populate({ path: 'tags', select: '-__v' })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new post
    createThoughtByUser(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: thought.username },
                    { $addToSet: { thoughts: thought._id } }
                );
            })

            .catch((err) => res.status(500).json(err));
    },
    deleteOneThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
            .then((result) =>
                !result
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(result)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.updateOne({ _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText } })
            .then((result) =>
                !result
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(result)
            )
            .catch((err) => res.status(500).json(err));
    }
};
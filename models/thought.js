const { Schema, model } = require('mongoose');

const Reaction = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // createdAt:{
    //     type:Date,
    //     default: Date.now,
    //     get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    // },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
const { Schema, model } = require('mongoose');

// user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //stackoverflow  Mongoose validate email syntax /https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// export the User model
module.exports = User;
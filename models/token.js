const mongoose = require('mongoose');

const { Schema } = mongoose;


const tokenSchema = new Schema ({
    refreshToken: {
        type: Schema.Types.String,
    },
    accessToken: {
        type: Schema.Types.String
    }
});

const model = mongoose.model('token', tokenSchema)
module.exports = model;
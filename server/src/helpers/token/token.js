const jwt = require('jsonwebtoken');

const token = {
    generate: ({ id }, expiresIn) => {
        console.log(id);
        return jwt.sign({ 
            id
        }, process.env.JWT_SECRET, { expiresIn });
    }
};

module.exports = token;
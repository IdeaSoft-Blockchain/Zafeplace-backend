const messages = require('config/messages');

exports.messageGenerator = messageCode => {
    return Object.assign(messages[messageCode], {messageCode})
};

module.exports = function (container) {

    container.register('Mongoose', require('../services/Mongoose'), ['config/mongo/uri']);
    container.register('GridFS', require('../services/GridFS'), ['config/mongo/uri']);
    container.register('Tokenizer', require('../services/Tokenizer'), ['config/tokenizer/secret']);
    container.register('Mailer', require('../services/Mailer'), ['config/mailer/sender']);
    container.register('Host', require('../services/Host'), ['config/host/url']);

};
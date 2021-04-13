var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./notes');
const nodeCookie = require('node-cookie');
const uuid = require('uuid');

exports.checkContains = (req, res, next) => {
    try {
        var note = localStorage.getItem(nodeCookie.get(req, 'userId') + '_' + req.body.Id);
        if (note) {
            return next();
        }
        else {
            return res.status(400).send('a note not found');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

exports.checkLength = (req, res, next) => {
    console.log('validate length')
    try {
        if (req.body.text.length < 10000) {
            return next();
        }
        else {
            return res.status(400).send("note can't be bigger than 10,000 chars");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

exports.checkCookie = (req, res, next) => {
    console.log('validate cookie');
    try {
        if (nodeCookie.get(req, 'userId')) {
            return next();
        }
        else {
            nodeCookie.create(res, 'userId', uuid.v4());
            return next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

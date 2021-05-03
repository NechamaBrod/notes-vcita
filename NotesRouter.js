'use strict';

var express = require('express');
var router = express.Router();
var validate = require('./validate');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./notes');
const nodeCookie = require('node-cookie')

let notes = {};
let notesIds = 1000000;

router.get('/', function (req, res) {
    res.send("what are you want to do?" +
        "read,create,update or delete");
});

/* create new note in DB */
/* text: string */
router.post('/create',
    [
        validate.checkCookie,
        validate.checkLength
    ],
    function (req, res) {
        console.log("create new and send Id");
        try {
            localStorage.setItem(nodeCookie.get(req, 'userId') + '_' + notesIds, req.body.text)
            res.json({ 
                id: notesIds++
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

/* read note by Id */
/* Id: long */
router.get('/read',
    [
        validate.checkCookie,
        validate.checkContains
    ],
    function (req, res) {
        console.log("select and send by Id");
        try {
            res.json({
                id: req.body.Id,
                note: localStorage.getItem(nodeCookie.get(req, 'userId') + '_' + req.body.Id)
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

/* update note by Id */
/* Id: long, text: string */
router.put('/update',
    [
        validate.checkCookie,
        validate.checkContains,
        validate.checkLength
    ],
    function (req, res) {
        console.log("update by id");
        try {
            const id = req.body.Id;
            localStorage.setItem(nodeCookie.get(req, 'userId') + '_' + id, req.body.text)
            res.json({
                id: id
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

/* delete note by Id  */
/* Id: long */
router.delete('/delete',
    [
        validate.checkCookie,
        validate.checkContains
    ],
    function (req, res) {
        console.log("delete by Id");
        try {
            const id = req.body.Id;
            localStorage.removeItem(nodeCookie.get(req, 'userId') + '_' + id);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

module.exports = router;

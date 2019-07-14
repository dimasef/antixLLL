const express = require('express');
const db = require('mongodb');

const router = express.Router();

//Get Tasks
router.get('/', async (req, res) => {
    const tasks = await loadPostCollection();
    res.send(await tasks.find({}).toArray());
});

//Add Tasks
router.post('/', async (req, res) => {
    const tasks = await loadPostCollection();
    await tasks.insertOne({
        text: req.body.data.text,
        time: req.body.data.time,
        doneStatus: false,
        eternity: req.body.data.eternity,
        activeDays: req.body.data.activeDays,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Update Tasks
router.put('/:id', async (req, res) => {
    const tasks = await loadPostCollection();
    await tasks.updateOne(
        {_id: new db.ObjectID(req.params.id)},
        {$set: {"doneStatus": req.body.doneStatus}},
    );
    res.status(200).send();
});

//Delete Tasks
router.delete('/:id', async (req, res) => {
    const tasks = await loadPostCollection();
    await tasks.deleteOne({
        _id: new db.ObjectID(req.params.id)
    });
    res.status(200).send();
});

async function loadPostCollection() {
    const localDbUri = 'mongodb://localhost:27017/';
    const uri = "mongodb+srv://user_777:root777@cluster0-bc6uj.mongodb.net/test?retryWrites=true&w=majority";
    const client = await db.MongoClient.connect(uri, {
        useNewUrlParser: true
    });

    return client.db('antixToDo').collection('tasks');
}

module.exports = router;
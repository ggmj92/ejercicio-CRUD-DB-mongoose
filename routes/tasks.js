const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/create', async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch {
        console.error(error);
        res
            .status(500)
            .send({ message: 'There was a problem trying to create the task'});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'There was a problem trying to get the task' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to update the task' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to delete the task' });
    }
});

module.exports = router;
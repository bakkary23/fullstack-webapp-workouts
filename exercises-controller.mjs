import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';
import { check, validationResult } from 'express-validator'


const PORT = process.env.PORT;
const app = express();
app.use(express.json());



// CREATE controller ******************************************
app.post ('/exercises', 
// [
//     check('name').isLength({ min: 1 }),
//     check('reps').isInt({ min: 0 }),
//     check('weight').isInt({ min: 0 }),
//     check('string').isLength({ min: 1 }),
//     check('date').isDate()
// ],
 (req,res) => { 
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ error: "Invalid request" })
    // }
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Invalid input' });
        });
});


// RETRIEVE controller ****************************************************
// GET movies by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET exercise filtered by name, reps, weight, or date
app.get('/exercises', (req, res) => {
    let filter = {};
    // filter by name
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }
    // filter by reps
    if(req.query.reps !== undefined){
        filter = { reps: req.query.reps };
    }
    // filter by weight
    if(req.query.weight !== undefined){
        filter = { weight: req.query.weight };
    }
    // filter by date
    if(req.query.date !== undefined){
        filter = { date: req.query.date };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
            res.status(200);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: "Not found"});
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', 
// [
//     check('name').isLength({ min: 1 }),
//     check('reps').isInt({ min: 0 }),
//     check('weight').isInt({ min: 0 }),
//     check('string').isLength({ min: 1 }),
//     check('date').isDate()
// ], 
    (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ error: "Invalid request" })
    // }
    exercises.replaceExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date,
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id, 
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date,
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
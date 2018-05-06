var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    /*Create a note - POST method*/
    app.post('/notes', (req, res) => {
        const note = {title: req.body.title, message: req.body.message};
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    /* Get a note by id - GET method*/


    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {

            if (err) {
                res.send({'error': 'An error has occurred'});
            }
            else {
                res.send(item);
            }
        });

    });

    /* Delete a note by id - DELETE method*/

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'})

            }
            else {
                res.send('Note ' + id + ' deleted');
            }
        })

    });

    /*Update a note by using PUT method*/

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {title: req.body.title, message: req.body.message};
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            }
            else {
                res.send(note);
            }
        })
    })
};

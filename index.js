const Joi = require('joi');
const express = require('express');
const app = express();

//middleware
app.use(express.json())

const genres = [
    {
        id:1,
        name:'action'
    },
    {
        id:2,
        name:'horror'
    },
    {
        id:3,
        name:'romantic'
    },
]
//Retrieving genre from vidly
app.get('/api/genres',(req,res)=>{
    // const genre = genres.find(g=>g.id===parseInt(req.params.id));
    // if(!genre) return res.status(404).send('The genre does\'nt exist on vidly');
    res.send(genres);
});

//Inserting genre in vidly
app.post('/api/genres',(req,res)=>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id:genres.length + 1,
        name:req.body.name,
    };
    genres.push(genre);
    res.send(genre);
});

//Updating genre
app.put('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre does\'nt exist on vidly');
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});

//Delete Genre
app.put('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre does\'nt exist on vidly');
    const {error} = validateGenre(req.body);
    //continue
});



function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on ${port}`)});
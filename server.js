const express = require("express");
const app = express();

const db = require("./db/bdcall");

app.use(express.json());

const courses = [
    { id: 1 , name : 'course1'},
    { id: 2 , name : 'course2'},
    { id: 3 , name : 'course3'},
];

app.get('/', (req,res) => { // where '/' refers to the home page of the website 
    res.send('This is the home page');
});

app.get('/api/courses1', (req,res) => {
    res.send(courses);
});

app.post('/api/courses', (req,res) => {
    const new_course = {
        id: courses.length +1,
        name: req.body.name

    };
    courses.push(new_course);
    res.send(new_course);

});

app.post("/bdcall1", async (req,res) => {
    const results =await db.createBDcall(req.body);
    res.status(201).json({id: results[0]});
});

app.get("/bdcall2", async (req,res) => {
    const call =await db.getAllBDcall();
    res.status(200).json({id: call });
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
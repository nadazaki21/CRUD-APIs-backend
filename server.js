const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/bdcall");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/', (req,res) => { // where '/' refers to the home page of the website 
    res.send('This is the home page');
});



app.get("/bdcall", async (req,res) => {
    const call =await db.getAllBDcall();
    //res.status(200).json({id : call});
    res.send(call);
});

app.post("/test", async (req,res) =>{
    
    res.send("this post reqquest ir actually working ");
});

app.post("/bdcall", async (req,res) =>{
    const results =  await db.createBDcall(req.body);
    res.status(201).json({id: results[0]});
    //res.send("this post reqquest ir actually working ");
});

app.patch("/bdcall/:id", async (req,res) =>{  //where id here refers to call_id ggiven by me not the database id or numberin 
    console.log(req.params.id);
    const carid =  await db.updateBDcall(req.params.id,req.body);
    res.send("updated");
    //res.status(200).json({ carid });
    
});

app.delete("/bdcall/:id", async (req,res) =>{
    console.log(req.params.id);
    await db.deleteBDcall(req.params.id);
    //res.send("deleted");
    res.status(200).json({ success:true });
    
});


app.get("/bdcall/:id", async (req,res) => {
    const row =await db.SelectBDcall(req.params.id);
    res.send(row);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));






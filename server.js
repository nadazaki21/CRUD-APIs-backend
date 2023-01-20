const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/bdcall");
const { json } = require("body-parser");


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


app.get("/bdcall/:id", async (req,res) => {  // this function views the whole record 
    const row =await db.SelectBDcall(req.params.id);
    res.send(row);
});


app.get("/text/:id", async (req,res) => { // this function views only one attribute of the record by using the implementation of the function viewContentBDcall
    const bd =await db.viewContentBDcall(req.params.id);  // unres will be an array of the results
    res.json( {call : bd [0] });

});


app.get("/chat", async (req,res) => {  // this function views the whole record 
    const chat =await db.viewUnresponedBDcall();
    const count =await db.getCount();
    res.json(count[0]['count(`call_id`)']);

   
    
    
    res.json({chat : chat[0]});
});



app.get("/count", async (req,res) => {  // this function prints the number of rcords in th database 
   
    console.log(db.printCount());
    
    
   
});



app.delete("/clear", async (req,res) =>{
    
    await db.deleteALLBDcall();
    res.send("deleted");
    
    
});





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));






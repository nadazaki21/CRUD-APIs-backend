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



app.get("/bdcall", async (req,res) => {   // gets all records answered and unanswered 
    const call =await db.getAllBDcall();
    //res.status(200).json({id : call});
    res.send(call);
});



app.post("/bdcall", async (req,res) =>{    // posts to the database 
    const results =  await db.createBDcall(req.body);
    res.status(201).json({id: results[0]});
    //res.send("this post reqquest ir actually working ");
});

app.patch("/bdcall/:id", async (req,res) =>{  //upadtes the record //where id here refers to call_id ggiven by me not the database id or numberin 
    console.log(req.params.id);
    const carid =  await db.updateBDcall(req.params.id,req.body);
    res.send("updated");
    //res.status(200).json({ carid });
    
});

app.delete("/bdcall/:id", async (req,res) =>{  // deletes the record with the given id 
    console.log(req.params.id);
    await db.deleteBDcall(req.params.id);
    //res.send("deleted");
    res.status(200).json({ success:true });
    
});

app.delete("/clear", async (req,res) =>{  // deleted all records in database 
    
    await db.deleteALLBDcall();
    res.send("deleted");
    
    
});


app.get("/bdcall/:id", async (req,res) => {  // this function views the whole record of a given id 
    const row =await db.SelectBDcall(req.params.id);
    res.send(row);
});


app.get("/text/:id", async (req,res) => { // this function views only *one* attribute of the record by using the implementation of the function viewContentBDcall
    const bd =await db.viewContentBDcall(req.params.id);  // unres will be an array of the results
    res.json( {call : bd [0] });

});


app.get("/chat", async (req,res) => {  // this function views the recored of the unresponeded only  // it views their id (phone no.s)
    const chat =await db.viewUnresponedBDcall();
    const count =await db.getCount();
    //res.json(count[0]['count(`call_id`)']);
    const x =count[0]['count(`call_id`)'];
    console.log(x);

   
    
    for(i=0 ; i<= x ; i++){
    res.json({chat : chat[i]});
    }
});





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));






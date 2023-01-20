const knex = require ("./knex.js");

const { json } = require("body-parser");
const bodyParser = require('body-parser');



function createBDcall(bdcall){
   return knex("bdcall").insert(bdcall);
};



function getAllBDcall(){
    return knex("bdcall").select("*"); // add between brackets what you want to show 
};



function SelectBDcall(id){
  return knex("bdcall").where("call_id",id);
};


function viewContentBDcall(id){
    return knex("bdcall").where("call_id",id).select("call_content");
  };
  

function deleteBDcall(id){
    return knex("bdcall").where("call_id",id).del();
};

function deleteALLBDcall(id){
    return knex("bdcall").select().del();
};


function updateBDcall(id,bdcall){
    return knex("bdcall").where("call_id",id).update(bdcall);
};


function viewUnresponedBDcall(){

    return knex("bdcall").where("response",null).select("call_id");
    
}


function getCount(){
    
    return knex("bdcall").count("call_id");

    
}

// function printCount(){

//     // const count =getCount();
//     // res.json(count[0]['count(`call_id`)']);

//     count = getCount().json. ;
//     console.log(count);
//     result = count;
//     return result; 
// }





module.exports= {
   createBDcall,
   getAllBDcall,
   getCount,
   deleteALLBDcall,
   viewContentBDcall,
   SelectBDcall,
   viewUnresponedBDcall,
   deleteBDcall,
   updateBDcall,
   

}



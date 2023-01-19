const knex = require ("./knex.js");

function createBDcall(bdcall){
   return knex("bdcall").insert(bdcall);
};



function getAllBDcall(){
    return knex("bdcall").select("*"); // add between brackets what you want to show 
};



function SelectBDcall(id){
  return knex("bdcall").where("call_id",id);
};


function deleteBDcall(id){
    return knex("bdcall").where("call_id",id).del();
};

function updateBDcall(id,bdcall){
    return knex("bdcall").where("call_id",id).update(bdcall);
};


module.exports= {
   createBDcall,
   getAllBDcall,
   SelectBDcall,
   deleteBDcall,
   updateBDcall,
   

}



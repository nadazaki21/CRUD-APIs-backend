const knex = require ("./knex.js");

function createBDcall(bdcall){
   return knex("bdcall").insert(bdcall);
};



function getAllBDcall(){
    return knex("bdcall").select(bdcall);
};


function deleteBDcall(id){
    return knex("bdcall").select("id",id).del();
};

function updateBDcall(id,bdcall){
    return knex("bdcall").where("id",id).update(bdcall);
};


module.exports= {
   createBDcall,
   getAllBDcall,
   deleteBDcall,
   updateBDcall

}



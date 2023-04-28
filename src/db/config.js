const mongoose = require("mongoose");

const dbConection = async() => {

  try{

    await mongoose.connect(process.env.DB_MG);

    console.log('BD online');

  }catch(err){
    console.log(err);
    throw new Error('Error al levantar la BD');
  }

}

module.exports = {
  dbConection
}
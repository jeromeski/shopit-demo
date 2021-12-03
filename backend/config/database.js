const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
  })
}

module.exports = connectDataBase;
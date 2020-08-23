const app = require("./app");

const port = process.env.PORT || 3000;

//********************* MONGOOSE CONNECTION

// const dbName = 'urlShorter';
// const dbPath = `mongodb://localhost/${dbName}`;
//
// mongoose.connect(dbPath, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// })
//   .then(()=> {console.log('Mongoose connected to %s name database', dbName)})
//   .catch((err)=> {console.log('Database connection error', err.message)});

//********************** END

app.listen(port, () => {
  console.log("Server started at http://localhost:%s/", port);
});

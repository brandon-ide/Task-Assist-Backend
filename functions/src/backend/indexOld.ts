// // require the express module
// import express from "express";
// //import morgan from "morgan";
// // require the cors module
// import cors from "cors";
// import * as functions from 'firebase-functions';
// import taskRouter from "./routes/taskRouter";



// // creates an instance of an Express server
// const app = express();

// // enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
// app.use(cors());
// //app.use(morgan('dev'));

// // allow POST and PUT requests to use JSON bodies
// app.use(express.json());
// app.use("/", taskRouter);

// // define the port
// const port = 3000;


// // run the server
// app.listen(port, () => console.log(`Listening on port: ${port}.`));

// export const api = functions.https.onRequest(app);
const path = require("path");
const express = require("express"); //express is to send back HTML
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname)   //directory name => these to get part to public folder
// console.log(__filename) //these will provide the part to the file itself.
//console.log(path.join(__dirname, '../public/about-page.html'))

const app = express(); //express function doesnt take argument
const port = process.env.PORT || 3000 //this will be set to heroku 
// define path for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const pattialPath = path.join(__dirname, "../templates/partials");

//set up handle bars engin and views location
app.set("view engine", "hbs"); //to get handlebars set up, allow javaScriot to use insided HTML, handdlebas
app.set("views", viewPath);
hbs.registerPartials(pattialPath);

//setuo static directoy to serve
app.use(express.static(publicDirectoryPath)); //this is the function that help to  to customize the server.

const name = "Sara Promadee";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name,
  });
});

app.get("/about", (req, res) => {
  //get() method take 2 argument, req=requesrt , res=response
  //res.send('<h1> '+name+' </h1>')  //send back HTML
  res.render("about", {
    title: "About me",
    name,
  });
});

// app.get('', (req,res)=>{         //get() method take 2 argument, req=requesrt , res=response
//     const name = "Weather"
//     res.send('<h1> '+name+' </h1>')  //send back HTML

// })

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Please contact us for more information",
    email: "service@gmail.com",
    tel: "07510063921",
    name,
  });
});
//     res.send([{              //send back JSON      ({ object,object })  or ([{ array},{ array }])
//         name: 'Sara',
//         age:27
//     },{ name: 'Lewis',
//     age: 25
//     }
// ]

app.get("/weather", (req, res) => {
  //this is JSON data use  res.send instead of res.get
  if (!req.query.address) {
    return res.send({
      error: "You Must Provide An Address",
    });
  }
  geocode(req.query.address,
    (error, { latitude , longtitude, location } = {}) => {
      //address=> 'New York', callback = (error,data)  //changed data to {latitude,longtitude,location}
      if (error) {
        res.status(400)
        return res.send({error}) //if there is error, the function stops, and error prints. if not, continue below
      }
      //philadelphia
  forecast(latitude, longtitude, (error, forecastData) => {
        //change lat/long number to data.latitude,data.longtitude after move inside //removed data.tatitude...,data.longtitude...
     if (error) {
          res.status(400)
          return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address:req.query.address
        })
        
      });
    }
  );

  
});


app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      //add retun to stop code unning twice
      error: "You Must Poduct a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    poduct: [],
  });
});

app.get("/help/*", (req, res) => {
  //help 404
  res.render("404", {
    title: "404",
    name,
    errorMessage: "Help aticle not found",
  });
});

app.get("*", (req, res) => {
  //error page, when url page is not match
  res.render("404", {
    //generic 404
    title: "404",
    name,
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  //port 3000
  console.log("Server is out on port" + port);
});   //fixing port issue 

//!!! always control + C  => to stop the server running
// nodemon src/app.js    =>> no need to keep running the command when something change, but can refesh the page

// "start": "node src/app.js",
// "start:dev": "nodemon src/app.js",

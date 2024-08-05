const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const db = require ("./config/db");
require("dotenv").config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




// important!!!! middleware to parse json to add it 
router.use(express.json());


db.authenticate().then(() => {
  db.sync({ alter: true });
  console.log("connect");
})

router.get("/test",(req,res)=>{
  res.json({
    msg:"your appppppppppp"
  })
})


router.use("/api/user", require("./routes/UserRoutes"));
router.use("/api/auth", require("./routes/Auth"));


const port= process.env.PORT||5000;

router.listen(port, () => {
  console.log(`listening on ${port}.....!!!`);
});



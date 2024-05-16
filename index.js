const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
 let userarray =[]
 let todoarray = []

 let userschema = new mongoose.Schema({
   firstname:{type:String},
   lastname:{type:String},
   email:{type:String},
   password:{type:String},
 })

let usermodel = mongoose.model("user_collection", userschema)

app.get("/",(req, res)=>{
    // res.send([
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //     { name:"nelson", class:"Node"},
    //    ])
    // res.sendFile(__dirname + "/index.html")
    // console.log(__dirname + "/index.html");

    res.render('index',{name:"esther"})

})

app.get("/user",(req, res)=>{
    res.send("welcome user")
  

})
app.get("/todo",(req, res)=>{
   res.render("todo",{todoarray:todoarray})
})
app.get('/signup',(req, res)=>{
   res.render('signup')
})
app.get('/signin',(req, res)=>{
    res.render('login')
 })

app.post('/register', async(req, res)=>{
   try {
      console.log(req.body);
      let users =  await usermodel.create(req.body)
      if (users) {
        console.log("signedup successful");
          res.redirect("/signin")
      }else{
       console.log("error occured while signing up");
      }
   } catch (error) {
      console.log(error);
   }
  
  
})


app.post("/login",(req, res)=>{
   console.log(req.body);
   const {email, password} = req.body
   let existuser = userarray.find(el=>el.email == email )
   console.log(existuser);
   if (existuser && 
    existuser.Password === password) {
    console.log("login successful")
    res.redirect('/')
   }else{
    console.log("user does not exist")
   }

})

app.post("/addtodo",(req, res)=>{
   console.log(req.body);
   todoarray.push(req.body)
   console.log(todoarray);
   res.redirect("/todo")
})
app.post("/delete/:index",(req, res)=>{
    console.log(req.params.index);
    // console.log(req.body);
    let index = req.params.index
    todoarray.splice(index, 1)
    res.redirect("/todo")

})
app.get("/edit/:index",(req, res)=>{
  console.log( req.params.index);
  let index = req.params.index
  res.render('edit',{index, todoarray})
})

app.post("/update/:index",(req, res)=>{
   console.log(req.params.index , "params");
   let index = req.params.index
   todoarray[index] = req.body
   console.log(todoarray);
   res.redirect('/todo')
})



const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/mayclass?retryWrites=true&w=majority&appName=Cluster0"

const connect = ()=>{
   try {
      const connection = mongoose.connect(uri)
      if (connection) {
         console.log("connected to database");
      }else{
       console.log("error occured");
      }
   } catch (error) {
      console.log(error);
   }
 
}

connect()

let port = 5005
app.listen(port,()=>{ 
   console.log(`app started on port ${port}`);
})
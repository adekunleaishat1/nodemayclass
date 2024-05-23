const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
 let userarray =[]
 let todoarray = []

 let userschema = mongoose.Schema({
   firstname:{type:String, required:true},
   lastname:{type:String, required:true},
   email:{type:String, required:true, unique:true},
   password:{type:String, required:true}
  })

let usermodel = mongoose.model("user_collection", userschema)

app.get("/", async(req, res)=>{
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
    let alluser =  await usermodel.find()
     console.log(alluser);
    res.render('index',{name:"esther",alluser})

})

app.get("/user",(req, res)=>{
    res.send("welcome user")
  

})
app.get("/todo",(req, res)=>{
   res.render("todo",{todoarray:todoarray})
})
app.get('/signup',(req, res)=>{
   res.render('signup',{message:""})
})
app.get('/signin',(req, res)=>{
    res.render('login', {message:""})
 })

//CRUD - Create Read Update And Delete
 

app.post('/register', async(req, res)=>{
   try {
      console.log(req.body);
   let user =  await usermodel.create(req.body)
      if (user) {
         console.log("user signuped up successful");
         res.redirect("/signin")
      }

   } catch (error) {
      console.log(error.message);
      let message = error.message
      res.render("signup", {message})
   } 
   
  
})

app.post("/delete/:id", async(req, res)=>{
  console.log(req.params.id);
  let id = req.params.id
 let user = await usermodel.findByIdAndDelete({_id:id})
 console.log(user);
 if (user) {
   res.redirect("/")
 }
})


app.post("/login", async(req, res)=>{
   try {
      console.log(req.body);
      const {email, Password} = req.body
        let curuser = await usermodel.findOne({email: email})
        console.log(curuser.password === Password);
        if (!curuser) {
          console.log("email is not valid");
          let message = "email is not valid"
          res.render("login", {message})
        }
        else if (curuser.password == Password) {
         console.log("user login successful");
         res.redirect("/")
       }else{
         console.log("user is not signed up , please register.")
         let message = "user is not signed up , please register."
         res.render("login", {message})
      }
   
   } catch (error) {
      console.log(error.message);
      let message = error.message
      res.render("login", {message})
   }
  
   // let existuser = userarray.find(el=>el.email == email )
   // console.log(existuser);
   // if (existuser && 
   //  existuser.Password === password) {
   //  console.log("login successful")
   //  res.redirect('/')
   // }else{
   //  console.log("user does not exist")
   // }

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





 const connect = () =>{
   try {
   if (mongoose.connect(uri)) {
      console.log("connected to database");
   } 
   } catch (error) {
      console.log(error);
   }
 }



 connect()
// const connect = ()=>{
//    try {
//       const connection = mongoose.connect(uri)
//       if (connection) {
//          console.log("connected to database");
//       }else{
//        console.log("error occured");
//       }
//    } catch (error) {
//       console.log(error);
//    }
 
// }



let port = 5005
app.listen(port,()=>{ 
   console.log(`app started on port ${port}`);
})
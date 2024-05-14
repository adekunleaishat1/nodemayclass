const express = require("express")
const app = express()
const ejs = require("ejs")
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
 let userarray =[]
 let todoarray = []
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

app.post('/register',(req, res)=>{
    console.log(req.body);
    userarray.push(req.body)
    console.log(userarray);
    res.redirect("/signin")
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

let port = 5005

app.listen(port,()=>{
   console.log(`app started on port ${port}`);
})
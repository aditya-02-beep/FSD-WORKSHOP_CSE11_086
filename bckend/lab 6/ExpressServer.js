import express from "express";
const port= 3000;
const app= express();
const userData= [
  {
        id: 1,
        name: "A",
        age: 20
    },
    {
        id: 2,
        name: "Ak",
        age: 21
    },
    {
        id: 3,
        name: "o",
        age: 22
    }  
];
app.get("/", (req,res)=>{
    res.status(200).json({
    message: "welcome user"
});

});
app.listen(port, ()=>{
    console.log("server is running on http://localhost:3000");
});
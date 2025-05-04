require("dotenv").config();

// const express = require("express");
import express from 'express';
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

const API_KEY = process.env.NEWS_API_KEY;

function fetchNews(url , res){
    axios.get(url)
    .then(response =>{
        if(response.data.totalResults > 0 ){
            res.json({
                status:200,
                success : true,
                message : "Successfully fetched the data",
                data : response.data
            });
        } else{
            res.json({
                status : 200,
                success : true,
                message : "No more result to show"
            });
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success : false,
            message : "Failed to fetch data from the API",
            error : error.message

        });
    });
}

//all news

app.get("/all-news" , (req,res) =>{
    let pageSize = parseInt(req.query.pageSize) || 40 ;
    let page = parseInt(req.query.page) || 1;
    let url=`https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    // let url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url ,res);
});

//top headlines
app.options("/top-headlines", cors());
app.get("/top-headlines", (req,res)=>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";

    // let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url , res);
});


//country
// app.options("/country/:iso" ,cors());
app.get("/country/:iso", (req,res) =>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    const country = req.params.iso.toLowerCase();

    console.log("Requested country:" , country);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;

    console.log("URL:", url);
    fetchNews(url , res);
    
});

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});


// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const app = express();

// // CORS configuration
// app.use(cors({
//   origin: '*', // Be cautious with this in production
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const API_KEY = process.env.API_KEY;

// // Helper function for API requests
// async function makeApiRequest(url)  { 
//   try  {
//     const response = await axios.get(url);
//     return {
//       status: 200,
//       success: true,
//       message: "Successfully fetched the data",
//       data: response.data,
//     };
//   } catch (error) {
//     console.error("API request error:", error.response ? error.response.data : error);
//     return {
//       status: 500,
//       success: false,
//       message: "Failed to fetch data from the API",
//       error: error.response ? error.response.data : error.message,
//     };
//   }
// }

// app.get("/all-news", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let q = req.query.q || 'world'; // Default search query if none provided

//   let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// app.get("/top-headlines", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let category = req.query.category || "general";

//   let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// app.get("/country/:iso", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   const country = req.params.iso;

//   let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//   console.log(`Server is running at port ${PORT}`);
// });

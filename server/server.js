import express from 'express';
import {auth} from 'express-openid-connect';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connect from './db/connect.js';
import User from './models/UserModel.js';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

dotenv.config();
console.log("ENV TEST:", process.env.SECRET, process.env.BASE_URL);
const app = express();
app.set('trust proxy', 1);
app.use(cors({
    origin:process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'],
        allowedHeaders: ["Content-Type" , "Authorization"],
        exposedHeaders: ["set-cookie"],

}));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  routes:{
    postLogoutRedirect:process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  },

  session:{
    absoluteDuration: 30*24*60*60*1000,// 30 days
    cookie:{
        secure:true,
        sameSite: "None",
    }
  }
};

console.log("BASE_URL:", process.env.BASE_URL);
console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(auth(config));

// function to check if user exists in the db
const ensureUserInDB = asyncHandler(async(user) => {
    try {
        const existingUser = await User.findOne({auth0Id: user.sub});
        if(!existingUser){
            const newUser = new User({
              auth0Id: user.sub, 
              email: user.email,
              name: user.name,
              role:"jobseeker",
              profilePicture:user.picture, 
            });
            await newUser.save();
            console.log("User added to DB",user);
        }
        else{
            console.log("User already exists in DB",existingUser);
        }
    }
    catch(error){
        console.log("Error checking or adding user to DB",error.message);
    }
});

app.get("/",async (req,res)=>{
    if(req.oidc.isAuthenticated()){
        //check if Auth0 user exists in the db
        await ensureUserInDB(req.oidc.user);
        //redirect to the frontend
        return res.redirect(process.env.CLIENT_URL);
    }
    else{
        return res.send("Logged out");
    }
});

//routes
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file)=>{
    //import dynamic routes
    import(`./routes/${file}`).then((route) =>
    {
        app.use("/api/v1/",route.default);
})
    .catch((error) => {
        console.log("Error importing route",error);
    });
});
const server = async () => {
    try {
        await connect();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("Server error",error.message);
        process.exit(1);
    }
};
server();


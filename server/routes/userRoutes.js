import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
const router = express.Router();
router.get("/check-auth",(req,res)=>{
    console.log(req.oidc);
    console.log("Checking authentication status", req.headers);
    if(req.oidc.isAuthenticated()){
    return res.status(200).json({
        isAuthenticated:true,
        user:req.oidc.user,
    });
    }
    else{
        return res.status(200).json(false);
    }
});
router.get("/user/:id",getUserProfile);
export default router;
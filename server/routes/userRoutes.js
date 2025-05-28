import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
const router = express.Router();
router.get("/check-auth",(req,res)=>{
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
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
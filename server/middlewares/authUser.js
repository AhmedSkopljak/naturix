import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return res.json({success: false, error: "Not Authorized"});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!req.body) req.body = {};

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success: false, error: "Not Authorized"});
        }
        next();
    }catch(error){
        res.json({success: false, error: error.message});
    }
}

export default authUser;
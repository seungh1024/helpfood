exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({
            code:403,
            message:'로그인 필요'
    })}
};

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.json({
            code:200,
            message:'로그인한 상태'
        });
    }
};
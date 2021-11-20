const passport =require('passport');

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

exports.verifyToken = (req,res,next)=>{
    passport.authenticate('jwt',{session:false},
    async(error,user,info)=>{
        if(error){
            console.error(error);
            next(error);
        }else if(info){
            if(info.message == '가입되지 않은 회원입니다'){
                res.json({
                    code:401,
                    message:info.message
                });
            }else if(info.message == 'jwt expired'){
                res.json({
                    code:419,
                    message:'토큰이 만료되었습니다'
                })
            }else{
                res.json({
                    code:410,
                    message:'잘못된 토큰 형식입니다'
                })
            }
        }
        req.user = user;
        next();
    })(req,res,next)

};
const passport =require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

const nodeCache = require('node-cache');

const myCache = new nodeCache({ stdTTL: 0, checkperiod: 900});

module.exports = () => {
    passport.serializeUser((user,done) =>{
        done(null,user.id);
    });

    passport.deserializeUser(async(id,done) =>{
        const value = myCache.get(id);

        if(value != null){
            done(null,JSON.parse(value));
        }else{
            try{
                const user = await User.findOne({
                    where:{id},
                });

                const success = myCache.set(id,JSON.stringify(user.dataValues));
                if(success){
                    done(null,user);
                }else{
                    done({message:'사용 권한이 없습니다'});
                }
            }catch(error){
                done(error);
            }
        }
    });

    local();
};
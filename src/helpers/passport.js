require("module-alias/register");
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {users: User} = require('@models')
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts =  {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'you_jwt_secret'

passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{

    try {
        const user = await User.findOne({where : {email : jwt_payload.email}})    
        if(user) {
            return done(null,user)
        }
        else {
            return done(null,false)
        }
    
    } catch (error) {
        return done(error,false)
    }

}))

passport.serializeUser(function(user,done){
    done(null,user.email)
})

passport.deserializeUser(function(id,done){
    user.findById(id,function(err,user){
        done(err,user)
    })
})

module.exports = passport
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../models/User";
import { GoogleProfile } from "../interfaces/User";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user : User, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/auth/google/callback',
},
    
async (accessToken : string, refreshToken : string, profile : GoogleProfile, done) => {
        return done(null, profile);
    }
));
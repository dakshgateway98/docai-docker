import passport from 'passport';

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });
export const googleLoginCallback = passport.authenticate('google', { failureRedirect: '/' });
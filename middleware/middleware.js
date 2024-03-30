const noCacheMid = (req , res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
}

const authenticationMid = (req, res, next) => {

    const isAthenticated = req.session.user ? true : false;
   
    const isLoginPage = (req.url === '/login');

    if(isAthenticated && isLoginPage){

        return res.redirect('/dashboard');

    }
    
    if(!isAthenticated && !isLoginPage){
    
        return res.redirect('/login')
    
    }

    next();
}

module.exports = {noCacheMid, authenticationMid}
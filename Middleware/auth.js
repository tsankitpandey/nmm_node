const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.redirect('/');
    }

    if (token && tokenBlacklist.has(token)) { 
        return res.status(401).json({ message: "Token is invalid or expired" });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  
            req.user = decoded; 
            next();  
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
};

// Function to handle logout
function logout(req, res) {
    const token = req.cookies.authToken;
    if (token) {
        tokenBlacklist.add(token); 
        res.clearCookie("authToken"); 
        // return res.status(200).json({ message: "Logout successful" });
        req.flash('success', 'Logout successful!');
        return res.status(200).redirect(res.Admin('/'));
        // return res.redirect('/');
    } else {
        return res.status(400).json({ message: "No token found" });
    }
}

// Function to handle if already token exist
const Authenticated = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            return res.redirect('/dashboard');
        } catch (err) {
            return next();
        }
    } else {
        return next();  
    }
};


module.exports = { verifyToken, logout, Authenticated };

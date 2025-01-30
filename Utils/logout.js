const tokenBlacklist = new Set(); // Initialize the token blacklist

// Logout function
function logout(req, res) {
    const token = req.cookies.authToken; // Retrieve the token from cookies
    if (token) {
        tokenBlacklist.add(token); // Add token to the blacklist
        res.clearCookie("authToken"); // Clear the token cookie
        return res.status(200).json({ message: "Logout successful" });
    } else {
        return res.status(400).json({ message: "No token found" });
    }
}

// Middleware to check if the token is blacklisted
function checkToken(req, res, next) {
    const token = req.cookies.authToken; // Retrieve the token from cookies

    if (token && tokenBlacklist.has(token)) { // ✅ Use `.has()` correctly
        return res.status(401).json({ message: "Token is invalid or expired" });
    }

    next(); // Proceed if token is valid
}

// Export using CommonJS
module.exports = { logout, checkToken, tokenBlacklist };

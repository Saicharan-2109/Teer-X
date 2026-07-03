// A simple list kept in server memory to track hackers
const blockedIPs = new Set();

// A list of URLs that ONLY automated hacking bots look for.
// Legitimate users will never try to visit these pages.
const suspiciousPaths = [
    '/.env',
    '/wp-admin',
    '/wp-login.php',
    '/.git/config',
    '/phpmyadmin'
];

/**
 * The Teer-X Middleware Engine
 */
function teerX() {
    return function (req, res, next) {
        const clientIP = req.ip || req.connection.remoteAddress;

        // 1. Check if they are already on the blacklist
        if (blockedIPs.has(clientIP)) {
            console.log(`[TEER-X] Blocked known malicious IP: ${clientIP}`);
            return res.status(403).json({ error: 'Access Denied: IP Blacklisted by Teer-X' });
        }

        // 2. Check if they are digging where they shouldn't be
        const isSuspicious = suspiciousPaths.some(path => req.url.includes(path));
        
        if (isSuspicious) {
            // Add them to the permanent blacklist
            blockedIPs.add(clientIP);
            console.log(`[TEER-X] 🚨 THREAT DETECTED! IP ${clientIP} tried to access ${req.url}. IP Blacklisted.`);
            return res.status(403).json({ error: 'Access Denied: Suspicious Activity Detected' });
        }

        // 3. If they are safe, let them pass to the actual website
        next();
    };
}

// Export the function so other developers can download and use it!
module.exports = teerX;

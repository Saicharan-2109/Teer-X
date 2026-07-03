# Teer-X

A lightweight, brutally efficient Express.js middleware designed to act as a cybersecurity honeypot. It intercepts traffic to sensitive endpoints (like `/.env` or `/wp-admin`) and instantly blacklists malicious IPs in memory.

## Installation

```bash
npm install teer-x
```

## Usage

Add `teer-x` to your Express application to instantly protect your server from automated reconnaissance bots.

```javascript
const express = require('express');
const teerX = require('teer-x');

const app = express();

// Protect your app globally
app.use(teerX());

app.get('/', (req, res) => {
    res.send("Safe users can see this!");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
```

## How it works
1. **Honeypot Routes**: Teer-X listens for requests to common vulnerability scanning paths.
2. **Instant Blacklist**: If an IP hits a honeypot, it is instantly added to an in-memory `Set`.
3. **Permanent Block**: All future requests from that IP are dropped immediately with a `403 Forbidden`, saving server CPU and preventing DDoS.

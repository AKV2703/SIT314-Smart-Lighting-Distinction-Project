require('dotenv').config();
const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Decision Service running at http://localhost:${PORT}`);
});

// error handling: if the port is busy or missing
server.on('error', (err) => {
    console.error('[decision] Server error:', err.message);
});
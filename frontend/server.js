const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

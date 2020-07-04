const express = require('express')
const path = require('path')

const app = express();

// Serve only the static files froom the dist directory
app.use(express.static(__dirname + '/dist/browser'));

app.get('/*', (request, response) => {
    response.sendfile(path.join(__dirname + '/dist/browser/index.html'));
});

app.listen(process.env.PORT || 8080);
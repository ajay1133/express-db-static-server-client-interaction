const
    express = require('express'),
    process = require('process'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.port || 3000;
app.use(bodyParser.json());    
app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`);
});
// Response middleware
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Routes
// Health check route
app.get('/api/v1/health-check', (req, res) => {
    res.status(200).json('Health check successful');
});
// Sample get route
app.get('/api/v1/get-item', async (req, res) => {
    try {
        if (!req || !req.query) {
            throw new Error('Invalid request');
        }
        if (!req.query.id) {
            throw new Error("Invalid request: 'id' field is required");
        }
        const 
            { id } = req.query, 
            data = [
                { id: 1, name: 'item1' },
                { id: 2, name: 'item2' }
            ],
            item = data.filter(v => v.id === parseInt(id));
        if (!item.length) {
            res.status(200).json('No item found');
        } else {   
            res.status(200).json(item);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(`Error: ${e.message || JSON.stringify(e)}`);
    }
});    
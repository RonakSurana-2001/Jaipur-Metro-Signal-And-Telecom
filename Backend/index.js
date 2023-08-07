const connectToMongo=require('./db');

const express = require('express')
const app = express()
const port = process.env.port || 3001;
const cors=require('cors');
connectToMongo();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.use('/api/attendence',require('./routes/attendence'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

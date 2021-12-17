import app from './app.js'
import moongose from 'mongoose'

const app_ =  app;
const  port= process.env.PORT || 4000;
const { MONGO_URI } = process.env

// starting the server index
moongose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected MongoDB 📦'))
.catch(err => console.error('Error connecting to MongoDB 💥', err));

app_.listen(port, () => {
    console.log(`Server on port ${port}`);
});



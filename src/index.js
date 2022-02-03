import moongose from 'mongoose'
import app from './app.js'

const  port = process.env.PORT || 4000;
const { MONGO_URI } = process.env

moongose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected MongoDB 📦'))
.catch(err => console.error('Error connecting to MongoDB 💥', err));

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});



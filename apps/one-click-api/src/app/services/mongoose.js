import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'OneClickStaging'
}).then(client => {
    global.mongoClient = client;
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

export default mongoose;

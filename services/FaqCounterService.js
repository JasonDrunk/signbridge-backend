const { connectDB, DATABASE_COLLECTIONS } = require("../config/database");

const FaqCounterService = {
    async getNextValue(counterName) {
        const { client, database } = await connectDB();
        const countersCollection = database.collection(DATABASE_COLLECTIONS.FAQ_COUNTER);

        // Check if the collection exists, create it if not
        const collections = await database.listCollections({ name: DATABASE_COLLECTIONS.FAQ_COUNTER }).toArray();
        if (collections.length === 0) {
            await database.createCollection(DATABASE_COLLECTIONS.FAQ_COUNTER);
            // Insert a document with the initial value (modify 1 to your desired value)
            await countersCollection.insertOne({ _id: counterName, value: 3 });
        }
        const result = await countersCollection.findOneAndUpdate(
            { _id: counterName },
            { $inc: { value: 1 } },
            { upsert: true, returnOriginal: false }
        );
        client.close();
        return result.value;
    }
};

module.exports = FaqCounterService
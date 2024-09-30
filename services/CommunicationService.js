const { connectDB, DATABASE_COLLECTIONS } = require("../config/database");
const CommunicationCounterService = require("./CommunicationCounterService");

const CommunicationService = {
    async fetchLogsByUser(data) {
        try {
            const { client, database } = await connectDB();
            const collection = database.collection(DATABASE_COLLECTIONS.COMMUNICATION_LOG);
            const result = await collection.find({ user_id: data.user_id, module: data.module }).toArray();
            client.close();
            return result;
        } catch (error) {
            throw new Error(`Error fetching logs: ${error.message}`);
        }
    },


    async CreateLogsByUser(data) {
        try {
            const { client, database } = await connectDB();
            const collection = database.collection(DATABASE_COLLECTIONS.COMMUNICATION_LOG);
            const logid = await CommunicationCounterService.getNextValue('logId')
            data.log_id = logid;
            const result = await collection.insertOne(data);
            client.close(); // Close the connection

            return result;
        } catch (error) {
            throw new Error(`Error creating log: ${error.message}`);
        }
    },

    async DeleteAllLogsByUser(id, data) {
        try {
            const { client, database } = await connectDB();
            const collection = database.collection(DATABASE_COLLECTIONS.COMMUNICATION_LOG);
            const result = await collection.deleteMany({ user_id: id, module: data.module });
            client.close();
            return result;
        } catch (error) {
            throw new Error(`Error deleting logs: ${error.message}`);
        }
    },

};

module.exports = CommunicationService;
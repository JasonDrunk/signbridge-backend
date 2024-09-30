const CommunicationService = require('../services/CommunicationService');

const CommunicationController = {
  async fetchLogsByUser(req, res) {
    try {
      const logBody = req.body;
      const log = await CommunicationService.fetchLogsByUser(logBody);
      res.status(200).json(log);
    } catch (error) {
      console.error('Error fetching logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async CreateLogsByUser(req, res) {
    try {
      const logBody = req.body;
      // Get the current timestamp
      const currentTime = new Date();

      // Extract year, month, day, hour, and minute from the timestamp
      const year = String(currentTime.getFullYear() % 100).padStart(2, '0');
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const hour = String(currentTime.getHours()).padStart(2, '0');
      const minute = String(currentTime.getMinutes()).padStart(2, '0');

      // Create the custom formatted timestamp
      const logTimestamp = `${year}/${month}/${day} - ${hour}:${minute}`;

      logBody.timestamp = logTimestamp;

      const newLog = await CommunicationService.CreateLogsByUser(logBody);
      res.status(201).json(newLog);
    } catch (error) {
      console.error('Error creating logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async DeleteAllLogsByUser(req, res) {
    try {
      const id = req.params.id;
      const logBody = req.body;
      const log = await CommunicationService.DeleteAllLogsByUser(id, logBody);
      res.status(200).json(log);
    } catch (error) {
      console.error('Error deleting history logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = CommunicationController;

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT;
const dbName = process.env.DATABASE_NAME;
const dbUrl = process.env.DATABASE_URL;
const client = new MongoClient(dbUrl);
const database = client.db(dbName);

// Middleware
app.use(cors({
  origin: `http://localhost:${process.env.FRONTEND_PORT}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// -------------------Newly Added Working According to Folder Structure----------------------------------------
const userRoutes = require("./routes/UserRoutes")
app.use(userRoutes);

const feedbackRoutes = require("./routes/FeedbackRoutes")
app.use(feedbackRoutes);

const faqRoutes = require("./routes/FaqRoutes")
app.use(faqRoutes);

const categoryRoutes = require("./routes/CategoryRoutes")
app.use(categoryRoutes);

const categorySignRoutes = require("./routes/CategorySignRoutes")
app.use(categorySignRoutes);

const communicationRoutes = require("./routes/CommunicationRoutes")
app.use(communicationRoutes);

const notificationRoutes = require("./routes/NotificationRoutes")
app.use(notificationRoutes);

const leaderboardRoutes = require("./routes/LeaderBoardRoutes")
app.use(leaderboardRoutes);

const formRoutes = require("./routes/DatasetFormRoutes")
app.use(formRoutes);
// ------------------------------------------------------------------------------------------------------------
const UserController = require("./controllers/UserController")
const FaqController = require("./controllers/FaqController")
const CategoryController = require("./controllers/CategoryController");
const CategorySignController = require('./controllers/CategorySignController');
app.listen(port, () => {
  // UserController.insertPresetAccounts();
  CategoryController.insertPresetSignCategories();
  CategorySignController.updateAvatarSigns();
  UserController.insertPresetCountry();
  FaqController.insertFixFaq();
});
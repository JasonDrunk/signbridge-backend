const NotificationController = require('../controllers/NotificationController');

const router = require('express').Router();

router.post('/notifications/create-notification', NotificationController.CreateNotification);
router.get('/notifications/user/:email', NotificationController.GetUserIdByEmail);
router.get('/notifications/fetch-notifications/:receiverId', NotificationController.GetNotifications);
router.get('/notifications/fetch-sender-info/:senderId', NotificationController.GetSenderInfo);
router.get('/notifications/fetch-notifications', NotificationController.FetchAllNotifications);
router.delete('/notifications/delete-notifications', NotificationController.DeleteNotification);
router.put('/notifications/update-statuses', NotificationController.UpdateNotificationStatuses);
// fetch the notifications count by receiver_id and status
router.get('/notifications/fetch-notifications-count/:receiverId/:status', NotificationController.FetchNotificationsCount);


module.exports = router;
const NotificationService = require('../services/NotificationService');

const NotificationController = {
    async CreateNotification(req, res) {
        try {
            const notificationData = req.body;
            const newNotification = await NotificationService.CreateNotification(notificationData);

            res.status(201).json(newNotification);
        } catch (error) {
            console.error("Error creating notification:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // get user_id by email (used to find the sender_id of a notification)
    async GetUserIdByEmail(req, res) {
        try {
            const email = req.params.email;
            const userId = await NotificationService.GetUserIdByEmail(email);
            
            res.status(200).json(userId);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async GetNotifications(req, res) {
        try {
            const userId = req.params.receiverId;
            const notifications = await NotificationService.GetNotifications(userId);

            res.status(200).json(notifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // get sender info by sender_id
    async GetSenderInfo(req, res) {
        try {
            const senderId = req.params.senderId;
            const senderInfo = await NotificationService.GetSenderInfo(senderId);

            res.status(200).json(senderInfo);
        } catch (error) {
            console.error("Error fetching sender info:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // fetch all notifications
    async FetchAllNotifications(req, res) {
        try {
            const notifications = await NotificationService.FetchNotifications();

            res.status(200).json(notifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async DeleteNotification(req, res) {
        try {
            const notificationIds = req.body.notificationIds;
            // console.log("notificationIdsDeleye:", notificationIds);
            const results = await Promise.all(notificationIds.map(async (notificationId) => {
                return await NotificationService.DeleteNotification(notificationId);
            }));
            res.status(200).json(results);
        } catch (error) {
            console.error("Error deleting notifications:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async UpdateNotificationStatuses(req, res) {
        try {
          const notificationIds = req.body.notificationIds; 
          const newStatus = req.body.status;
    
          const result = await NotificationService.UpdateNotificationStatuses(notificationIds, newStatus);
    
          if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'No notifications found' });
          } else {
            res.status(200).json({ message: `${result.modifiedCount} notification(s) updated successfully` });
          }
        } catch (error) {
          console.error("Error updating notification statuses:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // fetch the notifications count by receiver_id and status
    async FetchNotificationsCount(req, res) {
        try {
            const receiverId = req.params.receiverId;
            const status = req.params.status;
            const count = await NotificationService.FetchNotificationsCount(receiverId, status);

            res.status(200).json(count);
        } catch (error) {
            console.error("Error fetching notifications count:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

module.exports = NotificationController;
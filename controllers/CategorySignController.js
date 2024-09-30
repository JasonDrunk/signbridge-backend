const CategorySignService = require("../services/CategorySignService");
const FirebaseService = require('../services/FirebaseService');

const CategorySignController = {
    async fetchSign(req, res) {
        const cat = req.params.cat; // Assuming category is passed as a query parameter
        try {
            const signs = await CategorySignService.fetchSign(cat);
            res.status(200).json(signs);
        } catch (error) {
            console.error("Error fetching signs for:", cat, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    //WORK IN PROGRESS
    async updateAvatarSigns(res) {
        try {
          const result = await CategorySignService.updateAvatarSigns();
          if (res) {
            res.status(200).json({ message: 'Avatar signs updated successfully' });
          }
        } catch (error) {
          console.error('Error updating avatar signs:', error);
          if (res) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
      },

      
  async UpdateSign(req, res) {
    try {
      const signId = parseInt(req.params.id);
      const thumbnail = req.file;

      const sign = await CategorySignService.fetchSign();
      const oldsign = sign.find(s => s.signId === signId);
      const prev_sign_thumbnail = oldsign ? oldsign.thumbnail : null;

      if (prev_sign_thumbnail) {
        await FirebaseService.deleteLibraryImageInStorage(prev_sign_thumbnail);
      }

      if (thumbnail) {
        const imageURL = await FirebaseService.uploadLibraryImageToStorageAndGetURL(thumbnail);

        if (imageURL) {
          const result = await CategorySignService.UpdateSign(signId, { thumbnail: imageURL });
          return res.status(201).json(result);
        } else {
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      } else {
        return res.status(400).json({ error: 'Image is required' });
      }
    } catch (error) {
      console.error('Error updating sign thumbnail', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = CategorySignController;

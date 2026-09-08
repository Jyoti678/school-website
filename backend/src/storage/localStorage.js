const fs = require('fs');
const path = require('path');
const BaseStorageProvider = require('./storageInterface');

class LocalStorageProvider extends BaseStorageProvider {
  constructor() {
    super();
    this.uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file) {
    if (!file) {
      throw new Error('No file provided for upload.');
    }
    // Multer diskStorage automatically places the file in uploads/
    // We return the relative web accessible URL
    const relativeUrl = `/uploads/${file.filename}`;
    return {
      url: relativeUrl,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    };
  }

  async deleteFile(fileUrl) {
    if (!fileUrl || !fileUrl.startsWith('/uploads/')) return false;
    const filename = path.basename(fileUrl);
    const filePath = path.join(this.uploadDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }
}

// Storage Factory / Singleton
const storageProvider = new LocalStorageProvider();

module.exports = storageProvider;

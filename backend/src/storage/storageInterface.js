/**
 * Base Storage Interface
 * Abstract contract for file storage implementations.
 * Allows replacing local dev storage with S3, Cloudinary, etc., without altering business logic.
 */
class BaseStorageProvider {
  /**
   * Upload file
   * @param {Object} file - Multer file object or file buffer details
   * @returns {Promise<{ url: string, filename: string }>}
   */
  async uploadFile(file) {
    throw new Error('Method uploadFile() must be implemented.');
  }

  /**
   * Delete file
   * @param {string} fileUrl - Public URL or relative path of the file
   * @returns {Promise<boolean>}
   */
  async deleteFile(fileUrl) {
    throw new Error('Method deleteFile() must be implemented.');
  }
}

module.exports = BaseStorageProvider;

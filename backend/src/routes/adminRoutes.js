const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rate limiter for admin login attempts (prevent brute-force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

// Auth Routes (Unprotected or Self-protected)
router.post('/auth/login', loginLimiter, authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.getMe);

// Protect all routes below this middleware
router.use(requireAuth);

// Upload Route
router.post('/upload', upload.single('file'), adminController.uploadFile);

// Content Settings Updates
router.put('/settings', adminController.updateSettings);
router.put('/about', adminController.updateAbout);
router.put('/principal', adminController.updatePrincipal);
router.put('/academics', adminController.updateAcademics);
router.put('/admissions', adminController.updateAdmissions);

// Facilities Management
router.get('/facilities', adminController.getFacilities);
router.post('/facilities', adminController.createFacility);
router.put('/facilities/:id', adminController.updateFacility);
router.delete('/facilities/:id', adminController.deleteFacility);

// Faculty Management
router.get('/faculty', adminController.getFaculty);
router.post('/faculty', adminController.createFaculty);
router.put('/faculty/:id', adminController.updateFaculty);
router.delete('/faculty/:id', adminController.deleteFaculty);

// Notices Management
router.get('/notices', adminController.getNotices);
router.post('/notices', adminController.createNotice);
router.put('/notices/:id', adminController.updateNotice);
router.delete('/notices/:id', adminController.deleteNotice);

// Events Management
router.get('/events', adminController.getEvents);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

// Gallery Management
router.get('/gallery', adminController.getGallery);
router.post('/gallery', adminController.createGalleryItem);
router.put('/gallery/:id', adminController.updateGalleryItem);
router.delete('/gallery/:id', adminController.deleteGalleryItem);

// Enquiries Management
router.get('/enquiries/contact', adminController.getContactEnquiries);
router.put('/enquiries/contact/:id', adminController.updateContactStatus);
router.delete('/enquiries/contact/:id', adminController.deleteContactEnquiry);

router.get('/enquiries/admission', adminController.getAdmissionEnquiries);
router.put('/enquiries/admission/:id', adminController.updateAdmissionStatus);
router.delete('/enquiries/admission/:id', adminController.deleteAdmissionEnquiry);

module.exports = router;

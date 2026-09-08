const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const publicController = require('../controllers/publicController');

// Rate limiter for enquiry submissions (prevent spam)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 submissions per IP
  message: { success: false, message: 'Too many enquiry submissions from this IP, please try again after 15 minutes.' }
});

// Public GET Endpoints
router.get('/settings', publicController.getSettings);
router.get('/about', publicController.getAbout);
router.get('/principal', publicController.getPrincipal);
router.get('/academics', publicController.getAcademics);
router.get('/facilities', publicController.getFacilities);
router.get('/faculty', publicController.getFaculty);
router.get('/notices', publicController.getNotices);
router.get('/events', publicController.getEvents);
router.get('/gallery', publicController.getGallery);
router.get('/admissions', publicController.getAdmissions);

// Public POST Endpoints (Enquiries)
router.post('/contact-enquiry', enquiryLimiter, publicController.submitContactEnquiry);
router.post('/admission-enquiry', enquiryLimiter, publicController.submitAdmissionEnquiry);

module.exports = router;

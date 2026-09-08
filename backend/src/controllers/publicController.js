const settingsModel = require('../models/settingsModel');
const aboutModel = require('../models/aboutModel');
const principalModel = require('../models/principalModel');
const academicsModel = require('../models/academicsModel');
const facilitiesModel = require('../models/facilitiesModel');
const facultyModel = require('../models/facultyModel');
const noticesModel = require('../models/noticesModel');
const eventsModel = require('../models/eventsModel');
const galleryModel = require('../models/galleryModel');
const admissionModel = require('../models/admissionModel');
const enquiriesModel = require('../models/enquiriesModel');

async function getSettings(req, res, next) {
  try {
    const data = await settingsModel.getSettings();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getAbout(req, res, next) {
  try {
    const data = await aboutModel.getAllAbout();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getPrincipal(req, res, next) {
  try {
    const data = await principalModel.getPrincipal();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getAcademics(req, res, next) {
  try {
    const data = await academicsModel.getAcademics();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getFacilities(req, res, next) {
  try {
    const data = await facilitiesModel.getActiveFacilities();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getFaculty(req, res, next) {
  try {
    const data = await facultyModel.getActiveFaculty();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getNotices(req, res, next) {
  try {
    const data = await noticesModel.getPublicNotices();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getEvents(req, res, next) {
  try {
    const data = await eventsModel.getPublicEvents();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getGallery(req, res, next) {
  try {
    const category = req.query.category || null;
    const data = await galleryModel.getActiveGalleryItems(category);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getAdmissions(req, res, next) {
  try {
    const data = await admissionModel.getAdmissionInfo();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function submitContactEnquiry(req, res, next) {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone number, and message are required.' });
    }
    const id = await enquiriesModel.createContactEnquiry({ name, phone, email, message });
    res.json({ success: true, message: 'Your enquiry has been received. Our admissions team will contact you shortly.', id });
  } catch (err) { next(err); }
}

async function submitAdmissionEnquiry(req, res, next) {
  try {
    const { parent_student_name, phone, email, class_interested, message } = req.body;
    if (!parent_student_name || !phone || !class_interested) {
      return res.status(400).json({ success: false, message: 'Name, phone, and grade/class interested in are required.' });
    }
    const id = await enquiriesModel.createAdmissionEnquiry({ parent_student_name, phone, email, class_interested, message });
    res.json({ success: true, message: 'Admission application enquiry submitted successfully.', id });
  } catch (err) { next(err); }
}

module.exports = {
  getSettings,
  getAbout,
  getPrincipal,
  getAcademics,
  getFacilities,
  getFaculty,
  getNotices,
  getEvents,
  getGallery,
  getAdmissions,
  submitContactEnquiry,
  submitAdmissionEnquiry
};

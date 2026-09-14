const storageProvider = require('../storage/localStorage');
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

// Upload Handler using Storage Provider
async function uploadFile(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file was uploaded.' });
    }
    const result = await storageProvider.uploadFile(req.file);
    return res.json({ success: true, data: result });
  } catch (err) { next(err); }
}

// School Settings
async function updateSettings(req, res, next) {
  try {
    const current = await settingsModel.getSettings();
    const updated = await settingsModel.updateSettings(req.body);
    if (current && current.hero_image_url
      && Object.prototype.hasOwnProperty.call(req.body, 'hero_image_url')
      && current.hero_image_url !== req.body.hero_image_url) {
      await storageProvider.deleteFile(current.hero_image_url);
    }
    res.json({ success: true, message: 'School settings updated successfully.', data: updated });
  } catch (err) { next(err); }
}

// About Sections
async function updateAbout(req, res, next) {
  try {
    const { section_key, title, content } = req.body;
    if (!section_key || !title || !content) {
      return res.status(400).json({ success: false, message: 'section_key, title, and content are required.' });
    }
    const updated = await aboutModel.updateAboutSection(section_key, title, content);
    res.json({ success: true, message: 'About content updated successfully.', data: updated });
  } catch (err) { next(err); }
}

// Principal Info
async function updatePrincipal(req, res, next) {
  try {
    const updated = await principalModel.updatePrincipal(req.body);
    res.json({ success: true, message: "Principal's message updated successfully.", data: updated });
  } catch (err) { next(err); }
}

// Academics Info
async function updateAcademics(req, res, next) {
  try {
    const updated = await academicsModel.updateAcademics(req.body);
    res.json({ success: true, message: 'Academic information updated successfully.', data: updated });
  } catch (err) { next(err); }
}

// Facilities CRUD
async function getFacilities(req, res, next) {
  try {
    const data = await facilitiesModel.getAllFacilities();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createFacility(req, res, next) {
  try {
    const data = await facilitiesModel.createFacility(req.body);
    res.json({ success: true, message: 'Facility created.', data });
  } catch (err) { next(err); }
}

async function updateFacility(req, res, next) {
  try {
    const data = await facilitiesModel.updateFacility(req.params.id, req.body);
    res.json({ success: true, message: 'Facility updated.', data });
  } catch (err) { next(err); }
}

async function deleteFacility(req, res, next) {
  try {
    const deleted = await facilitiesModel.deleteFacility(req.params.id);
    if (deleted && deleted.image_url) {
      await storageProvider.deleteFile(deleted.image_url);
    }
    res.json({ success: true, message: 'Facility deleted.' });
  } catch (err) { next(err); }
}

// Faculty CRUD
async function getFaculty(req, res, next) {
  try {
    const data = await facultyModel.getAllFaculty();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createFaculty(req, res, next) {
  try {
    const data = await facultyModel.createFaculty(req.body);
    res.json({ success: true, message: 'Faculty member added.', data });
  } catch (err) { next(err); }
}

async function updateFaculty(req, res, next) {
  try {
    const data = await facultyModel.updateFaculty(req.params.id, req.body);
    res.json({ success: true, message: 'Faculty member updated.', data });
  } catch (err) { next(err); }
}

async function deleteFaculty(req, res, next) {
  try {
    const deleted = await facultyModel.deleteFaculty(req.params.id);
    if (deleted && deleted.photo_url) {
      await storageProvider.deleteFile(deleted.photo_url);
    }
    res.json({ success: true, message: 'Faculty member deleted.' });
  } catch (err) { next(err); }
}

// Notices CRUD
async function getNotices(req, res, next) {
  try {
    const data = await noticesModel.getAllNotices();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createNotice(req, res, next) {
  try {
    const data = await noticesModel.createNotice(req.body);
    res.json({ success: true, message: 'Notice published/created.', data });
  } catch (err) { next(err); }
}

async function updateNotice(req, res, next) {
  try {
    const data = await noticesModel.updateNotice(req.params.id, req.body);
    res.json({ success: true, message: 'Notice updated.', data });
  } catch (err) { next(err); }
}

async function deleteNotice(req, res, next) {
  try {
    const deleted = await noticesModel.deleteNotice(req.params.id);
    if (deleted && deleted.attachment_url) {
      await storageProvider.deleteFile(deleted.attachment_url);
    }
    res.json({ success: true, message: 'Notice deleted.' });
  } catch (err) { next(err); }
}

// Events CRUD
async function getEvents(req, res, next) {
  try {
    const data = await eventsModel.getAllEvents();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createEvent(req, res, next) {
  try {
    const data = await eventsModel.createEvent(req.body);
    res.json({ success: true, message: 'Event created.', data });
  } catch (err) { next(err); }
}

async function updateEvent(req, res, next) {
  try {
    const data = await eventsModel.updateEvent(req.params.id, req.body);
    res.json({ success: true, message: 'Event updated.', data });
  } catch (err) { next(err); }
}

async function deleteEvent(req, res, next) {
  try {
    const deleted = await eventsModel.deleteEvent(req.params.id);
    if (deleted && deleted.image_url) {
      await storageProvider.deleteFile(deleted.image_url);
    }
    res.json({ success: true, message: 'Event deleted.' });
  } catch (err) { next(err); }
}

// Gallery CRUD
async function getGallery(req, res, next) {
  try {
    const data = await galleryModel.getAllGalleryItems();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createGalleryItem(req, res, next) {
  try {
    const data = await galleryModel.createGalleryItem(req.body);
    res.json({ success: true, message: 'Gallery item added.', data });
  } catch (err) { next(err); }
}

async function updateGalleryItem(req, res, next) {
  try {
    const data = await galleryModel.updateGalleryItem(req.params.id, req.body);
    res.json({ success: true, message: 'Gallery item updated.', data });
  } catch (err) { next(err); }
}

async function deleteGalleryItem(req, res, next) {
  try {
    const deleted = await galleryModel.deleteGalleryItem(req.params.id);
    if (deleted && deleted.image_url) {
      await storageProvider.deleteFile(deleted.image_url);
    }
    res.json({ success: true, message: 'Gallery item deleted.' });
  } catch (err) { next(err); }
}

// Admission Info
async function updateAdmissions(req, res, next) {
  try {
    const data = await admissionModel.updateAdmissionInfo(req.body);
    res.json({ success: true, message: 'Admission information updated.', data });
  } catch (err) { next(err); }
}

// Enquiries Management
async function getContactEnquiries(req, res, next) {
  try {
    const data = await enquiriesModel.getContactEnquiries();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function updateContactStatus(req, res, next) {
  try {
    const { status } = req.body;
    await enquiriesModel.updateContactStatus(req.params.id, status);
    res.json({ success: true, message: 'Enquiry status updated.' });
  } catch (err) { next(err); }
}

async function deleteContactEnquiry(req, res, next) {
  try {
    await enquiriesModel.deleteContactEnquiry(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted.' });
  } catch (err) { next(err); }
}

async function getAdmissionEnquiries(req, res, next) {
  try {
    const data = await enquiriesModel.getAdmissionEnquiries();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function updateAdmissionStatus(req, res, next) {
  try {
    const { status } = req.body;
    await enquiriesModel.updateAdmissionStatus(req.params.id, status);
    res.json({ success: true, message: 'Admission enquiry status updated.' });
  } catch (err) { next(err); }
}

async function deleteAdmissionEnquiry(req, res, next) {
  try {
    await enquiriesModel.deleteAdmissionEnquiry(req.params.id);
    res.json({ success: true, message: 'Admission enquiry deleted.' });
  } catch (err) { next(err); }
}

module.exports = {
  uploadFile,
  updateSettings,
  updateAbout,
  updatePrincipal,
  updateAcademics,
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  updateAdmissions,
  getContactEnquiries,
  updateContactStatus,
  deleteContactEnquiry,
  getAdmissionEnquiries,
  updateAdmissionStatus,
  deleteAdmissionEnquiry
};

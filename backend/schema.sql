-- School Website + Admin CMS Database Schema
-- Database: school_cms

CREATE DATABASE IF NOT EXISTS school_cms DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_cms;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. School Settings Table
CREATE TABLE IF NOT EXISTS school_settings (
    id INT PRIMARY KEY DEFAULT 1,
    school_name VARCHAR(150) NOT NULL,
    logo_url VARCHAR(255),
    tagline VARCHAR(255),
    description TEXT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    timings VARCHAR(100),
    map_iframe_url TEXT,
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    instagram_url VARCHAR(255),
    youtube_url VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. About Content Table
CREATE TABLE IF NOT EXISTS about_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Principal Info Table
CREATE TABLE IF NOT EXISTS principal_info (
    id INT PRIMARY KEY DEFAULT 1,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) DEFAULT 'Principal',
    photo_url VARCHAR(255),
    message TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Academics Info Table
CREATE TABLE IF NOT EXISTS academics_info (
    id INT PRIMARY KEY DEFAULT 1,
    curriculum TEXT,
    methodology TEXT,
    academic_info TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Facilities Table
CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255),
    biography TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publish_date DATE NOT NULL,
    expiry_date DATE,
    attachment_url VARCHAR(255),
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 9. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time VARCHAR(50),
    location VARCHAR(150),
    image_url VARCHAR(255),
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    category VARCHAR(50) DEFAULT 'General',
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 11. Admission Info Table
CREATE TABLE IF NOT EXISTS admission_info (
    id INT PRIMARY KEY DEFAULT 1,
    info TEXT,
    eligibility TEXT,
    procedure_info TEXT,
    required_documents TEXT,
    important_dates TEXT,
    prospectus_url VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 12. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Admission Enquiries Table
CREATE TABLE IF NOT EXISTS admission_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_student_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    class_interested VARCHAR(50) NOT NULL,
    message TEXT,
    status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Data
INSERT INTO school_settings (id, school_name, logo_url, tagline, description, address, phone, email, timings, map_iframe_url, facebook_url, twitter_url, instagram_url, youtube_url)
VALUES (
    1,
    'St. Andrews International Academy',
    '/uploads/logo.png',
    'Nurturing Minds, Shaping Futures',
    'Founded in 1995, St. Andrews International Academy is committed to academic excellence, holistic character development, and equipping students with lifelong skills for global citizenship.',
    '124 Academy Boulevard, Education District, Cityville 400012',
    '+1 (555) 234-5678 / +1 (555) 234-5679',
    'info@standrewsacademy.edu',
    'Monday - Friday: 8:00 AM - 3:30 PM | Saturday: 8:00 AM - 12:30 PM',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.95373531531615!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1614000000000!5m2!1sen!2sin',
    'https://facebook.com',
    'https://twitter.com',
    'https://instagram.com',
    'https://youtube.com'
) ON DUPLICATE KEY UPDATE id=1;

INSERT INTO about_content (section_key, title, content) VALUES
('history', 'Our Rich Heritage', 'Established in 1995 with just 150 students, St. Andrews International Academy has grown into a premier institution serving over 2,500 students. Over nearly three decades, our graduates have excelled in top universities and professional fields globally.'),
('vision', 'Vision Statement', 'To be a beacon of educational excellence that inspires learners to achieve their full potential, embrace diversity, and contribute meaningfully to a rapidly evolving world.'),
('mission', 'Mission Statement', 'To provide a balanced, rigorous, and supportive learning environment that fosters critical thinking, moral integrity, intellectual curiosity, and physical well-being.'),
('values', 'Core Values', 'Integrity, Empathy, Excellence, Innovation, Resilience, and Community Stewardship.')
ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content);

INSERT INTO principal_info (id, name, designation, photo_url, message)
VALUES (
    1,
    'Dr. Eleanor Vance, Ph.D.',
    'Principal & Academic Director',
    '/uploads/principal.jpg',
    'Welcome to St. Andrews International Academy. Education is not merely the transmission of knowledge; it is the ignition of curiosity and the nurturing of character. We are dedicated to providing every child with an environment where intellectual rigour meets compassionate guidance.'
) ON DUPLICATE KEY UPDATE id=1;

INSERT INTO academics_info (id, curriculum, methodology, academic_info)
VALUES (
    1,
    'We follow a comprehensive global curriculum integrated with national standards from Kindergarten to Grade 12 (STEM, Humanities, Business & Arts).',
    'Experiential learning, inquiry-based projects, interactive digital labs, and collaborative team problem solving.',
    'Our academic performance consistently ranks in the top percentile nationally, with 98% college placement success across leading universities worldwide.'
) ON DUPLICATE KEY UPDATE id=1;

INSERT INTO admission_info (id, info, eligibility, procedure_info, required_documents, important_dates, prospectus_url)
VALUES (
    1,
    'Admissions are open for Kindergarten through Grade 11 for the academic session 2026-2027.',
    'Candidates must meet minimum age criteria by March 31st of the entry year and present satisfactory academic transcripts from their previous school.',
    '1. Submit online enquiry or obtain prospectus.\n2. Schedule interactive assessment/interview.\n3. Submission of completed form with documents.\n4. Confirmation of seat upon fee payment.',
    'Birth Certificate, Previous 2 years Marksheets, Transfer Certificate (TC), Passport size photographs, Medical fitness certificate.',
    'Application Form Available: Oct 1, 2026\nLast Date for Submission: Dec 15, 2026\nInteraction/Entrance Assessment: Jan 10-15, 2027\nSession Commences: April 1, 2027',
    '/uploads/prospectus.pdf'
) ON DUPLICATE KEY UPDATE id=1;

-- Seed Sample Facilities
INSERT INTO facilities (name, description, image_url, display_order, is_active) VALUES
('Modern Science Laboratories', 'State-of-the-art Physics, Chemistry, and Biology laboratories equipped with modern apparatus and safety gear.', '/uploads/facility_science_lab.jpg', 1, 1),
('Digital Resource Library', 'Over 30,000 physical volumes, e-book subscriptions, quiet study zones, and multimedia research pods.', '/uploads/facility_library.jpg', 2, 1),
('Olympic-sized Swimming Pool & Sports Complex', 'Includes indoor basketball courts, synthetic running track, soccer turf, and temperature-controlled swimming pool.', '/uploads/facility_sports.jpg', 3, 1),
('Robotics & AI Innovation Hub', 'Dedicated maker space equipped with 3D printers, IoT kits, and robotics testing arenas.', '/uploads/facility_robotics.jpg', 4, 1);

-- Seed Sample Faculty
INSERT INTO faculty (name, designation, department, photo_url, biography, display_order, is_active) VALUES
('Dr. Robert Sterling', 'Head of Department - Sciences', 'Science & Mathematics', '/uploads/faculty_robert.jpg', 'Ph.D. in Physics from Stanford University with 18 years of secondary education experience.', 1, 1),
('Ms. Clara Dupont', 'Senior Educator - Literature', 'Humanities & Languages', '/uploads/faculty_clara.jpg', 'M.A. in English Literature from Oxford University, passionate about creative writing and debaters club.', 2, 1),
('Mr. Marcus Thorne', 'Lead Instructor - Computer Science', 'Technology & Engineering', '/uploads/faculty_marcus.jpg', 'M.Tech in Computer Science, championing robotics and competitive coding among students.', 3, 1);

-- Seed Sample Notices
INSERT INTO notices (title, description, publish_date, expiry_date, attachment_url, is_published) VALUES
('Annual Academic & Cultural Fest 2026', 'The Annual Fest will take place on November 20-22, 2026. Registrations for inter-school competitions are now open.', CURDATE(), '2026-11-25', '/uploads/fest_notice.pdf', 1),
('Parent-Teacher Conference (Quarter 2)', 'Mandatory PTC scheduled for Saturday, October 10th from 9:00 AM to 1:00 PM. Parents can book time slots online.', CURDATE(), '2026-10-12', NULL, 1),
('Winter Uniform Transition Notice', 'All students must transition to the official winter uniform starting November 1st, 2026.', CURDATE(), '2026-11-30', NULL, 1);

-- Seed Sample Events
INSERT INTO events (name, description, event_date, event_time, location, image_url, is_published) VALUES
('Inter-School STEM & Robotics Olympiad', 'Annual competition featuring over 40 participating schools competing in automated robotics and AI challenges.', '2026-10-15', '09:00 AM - 04:00 PM', 'Main Auditorium & Tech Hub', '/uploads/event_stem.jpg', 1),
('Sports Day Gala 2026', 'Track and field athletics, house march past, and trophy ceremony.', '2026-11-05', '08:00 AM - 02:00 PM', 'School Sports Complex', '/uploads/event_sports.jpg', 1);

-- Seed Sample Gallery Items
INSERT INTO gallery (title, category, description, image_url, display_order, is_active) VALUES
('Annual Science Fair Exhibition', 'Academics', 'Students presenting working models of renewable energy projects.', '/uploads/gallery_science.jpg', 1, 1),
('State Basketball Championship Final', 'Sports', 'School varsity team lifting the regional championship trophy.', '/uploads/gallery_sports.jpg', 2, 1),
('Graduation Ceremony Class of 2026', 'Events', 'Seniors celebrating at the valedictory ceremony.', '/uploads/gallery_grad.jpg', 3, 1),
('Campus Greenery & Architecture', 'Campus', 'View of the central courtyard and heritage building.', '/uploads/gallery_campus.jpg', 4, 1);

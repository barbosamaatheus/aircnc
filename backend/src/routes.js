const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const BookingController = require('./controllers/BookingController');
const DashboardController = require('./controllers/DashboardController');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/spots/:spot_id/booking', BookingController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail') , SpotController.store);


routes.post('/bookings/:booking_id/approval', ApprovalController.store);
routes.post('/bookings/:booking_id/rejection', RejectionController.store);


module.exports = routes;
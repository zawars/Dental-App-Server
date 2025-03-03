/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  // Auth Controller Routes 
  'POST /api/v1/auth/login': 'AuthController.login',
  // 'POST /api/v1/auth/login/social': 'AuthController.socialLogin',
  'POST /api/v1/auth/forgetPassword': 'AuthController.forgetPassword',
  'POST /api/v1/auth/forget/verify': 'AuthController.forgetVerify',
  'POST /api/v1/auth/forget/renewPassword': 'AuthController.renewPassword',
  'POST /api/v1/auth/verify': 'AuthController.verify',
  'POST /api/v1/auth/verify/resend': 'AuthController.resendToken',

  // User Routes
  'GET /api/v1/user/adminStats': 'UserController.getAdminStats',
  'GET /api/v1/user/search': 'UserController.searchStudent',
  'POST /api/v1/user/register': 'UserController.register',
  'POST /api/v1/user/sendMail': 'UserController.sendMail',

  // Appointment Routes
  'POST /api/v1/appointment': 'AppointmentController.create',
  'GET /api/v1/appointment/getDashboardData': 'AppointmentController.getDashboardData',

  // Conversation Routes
  'GET /api/v1/conversation/chatBox': 'ConversationController.getChatBoxData',
  'GET /api/v1/conversation': 'ConversationController.index',
  'GET /api/v1/conversation/search': 'ConversationController.search',

  // Notification Routes
  'GET /api/v1/notification/recent/fetch': 'NotificationController.getRecentNotifications',

  // Patient Routes
  'GET /api/v1/patient': 'PatientController.index',

  // Doctor Routes
  'GET /api/v1/doctor/search': 'DoctorController.searchDoctor',

  // Slot Routes
  'POST /api/v1/slot/available': 'SlotController.isSlotAvailable',


};

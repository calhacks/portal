
import homeController from '../controllers/home';
import authController from '../controllers/auth';
import dashboardController from '../controllers/dashboard';
import applicationController from '../controllers/application';
import teamController from '../controllers/team';

export default {
    // Home route
    '/': {
        get: homeController.home
    },

    // Auth routes
    '/login': {
        get: authController.signIn,
        post: authController.submitLogin
    },
    '/signup': {
        get: authController.signUp,
        post: authController.submitSignup
    },
    '/logout': {
        get: authController.logout
    },
    '/verify': {
        get: authController.validate
    },
    '/inform_verify': {
        get: authController.informVerify
    },

    // Dashboard
    '/dashboard': {
        get: dashboardController.dashboard
    },

    // Submitting an app
    '/application': {
        get: applicationController.appPage,
        post: applicationController.submitApp
    },

    // Submitting a team
    '/team': {
        post: teamController.submitTeam,
    },

    // Leaving a team
    '/leaveTeam': {
        post: teamController.leaveTeam,
    }
};

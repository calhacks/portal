
import homeController from '../controllers/home';
import authController from '../controllers/auth';
import dashboardController from '../controllers/dashboard';

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

    // Dashboard
    '/dashboard': {
        get: dashboardController.dashboard
    }
};

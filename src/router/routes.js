
import homeController from '../controllers/home';
import authController from '../controllers/auth';
import dashboardController from '../controllers/dashboard';
import applicationController from '../controllers/application';
import teamController from '../controllers/team';
import cubstartController from '../controllers/cubstart';
import adminController from '../controllers/admin';

export default {
    // Home route
    '/': {
        get: homeController.home
    },
    // Home -> CH Code of Conduct
    '/code-of-conduct': {
        get: homeController.codeOfConduct,
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
    '/reset_password': {
      get: authController.resetPassword,
      post: authController.submitReset
    },
    '/reset': {
      get: authController.changePassword,
      post: authController.submitPassword
    },
    '/newPassword': {
      get: authController.newPassword
    },
    // Dashboard
    '/dashboard': {
        get: dashboardController.dashboard
    },

    // Submitting an app
    '/application': {
        get: applicationController.appPage,
        // post: applicationController.submitApp
    },

    // cubstart application
    '/cubstart': {
        get: cubstartController.cubstart,
        // post: cubstartController.submitApp
    },

    // Submitting a team
    '/team': {
        post: teamController.submitTeam,
    },

    // Leaving a team
    '/leaveTeam': {
        post: teamController.leaveTeam,
    },

    // God mode
    '/stats': {
        get: adminController.stats,
    },
    '/roster': {
        get: adminController.roster,
    },
    '/deify': {
        post: adminController.deify,
    },
    '/scoring': {
        get: adminController.scoring,
    },
    '/app': {
        get: adminController.getApp
    },
    '/score': {
        post: adminController.postScore,
        get: adminController.getScore
    },
    '/findApp': {
        get: adminController.findApp,
    },
    '/resume': {
        get: adminController.loadResume,
    },
    '/accumulate': {
        get: adminController.accumulate,
    },
    '/scoringStats': {
        get: adminController.scoringStats,
    }
};

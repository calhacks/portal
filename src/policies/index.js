
import { authenticateUser, emailVerify } from './auth'

export default {
    // Dashboard security
    '/inform_verify': {
        get: [authenticateUser(['hacker', 'admin'])],
        post: [authenticateUser(['hacker', 'admin'])]
    },

    // Dashboard security
    '/dashboard': {
        get: [authenticateUser(['hacker', 'admin']), emailVerify],
        post: [authenticateUser(['hacker', 'admin']), emailVerify]
    },

    // Can't submit app without credentials
    '/application': {
        get: [authenticateUser(['hacker', 'admin']), emailVerify],
        post: [authenticateUser(['hacker', 'admin']), emailVerify],
    },

    // Can't submit CubStart app without credentials
    '/cubstart': {
        get: [authenticateUser(['hacker', 'admin']), emailVerify],
        post: [authenticateUser(['hacker', 'admin']), emailVerify],
    },

    // Can't create/join team without credentials
    '/team': {
        post: [authenticateUser(['hacker', 'admin']), emailVerify],
    },

    // Can't leave team without credentials
    '/leaveTeam': {
        post: [authenticateUser(['hacker', 'admin']), emailVerify],
    }
};

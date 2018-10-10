
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
    },

    // God Mode
    '/stats': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/roster': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/deify': {
        post: [authenticateUser(['admin']), emailVerify],
    },
    '/scoring': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/app': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/score': {
        get: [authenticateUser(['admin']), emailVerify],
        post: [authenticateUser(['admin']), emailVerify],
    },
    '/findApp': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/resume': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/accumulate': {
        get: [authenticateUser(['admin']), emailVerify],
    },
    '/scoringStats': {
        get: [authenticateUser(['admin']), emailVerify],
    },

    '/admissions': {
        get: [authenticateUser(['admin']), emailVerify],
        post: [authenticateUser(['admin']), emailVerify],
    },

    '/hackerStatus': {
        get: [authenticateUser(['admin']), emailVerify],
        post: [authenticateUser(['admin']), emailVerify],
    },
};

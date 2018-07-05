
import { authenticateUser, emailVerify } from './auth'

export default {
    // Dashboard security
    '/dashboard': {
        get: [authenticateUser(['hacker', 'admin']), emailVerify],
        post: [authenticateUser(['hacker', 'admin']), emailVerify]
    },

    // Can't submit app without credentials
    '/app': {
        post: [authenticateUser(['hacker', 'admin'])],
    }
}

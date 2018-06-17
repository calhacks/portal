
import { authenticateUser, emailVerify } from './auth'

export default {
    // Dashboard security
    '/dashboard': {
        get: [authenticateUser(['hacker', 'admin']), emailVerify],
        post: [authenticateUser(['hacker', 'admin']), emailVerify]
    }
}

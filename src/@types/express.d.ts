declare namespace Express {
  export interface Request {
    profile?: import('../models/Profile'); // Add profile property to Request
    user?: import('../models/User')
  }
}

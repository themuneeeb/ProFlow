// src/controllers/userController.js
export async function getMe(req, res, next) {
  try {
    // req.user was set by your authMiddleware
    const user = req.user.toObject()
    delete user.password
    res.json(user)
  } catch (err) {
    next(err)
  }
}

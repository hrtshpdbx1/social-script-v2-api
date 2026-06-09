const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middlewares/auth/auth.middleware');
const bodyValidation = require('../middlewares/body-validation');
const { updateMeSchema } = require('../validators/user.validator');


userRouter.route('/me')
    .get(requireAuth, userController.getMe)
    .patch(requireAuth, bodyValidation(updateMeSchema), userController.updateMe);
module.exports = userRouter;
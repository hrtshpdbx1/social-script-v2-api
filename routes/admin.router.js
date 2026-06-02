const adminController = require('../controllers/admin.controller');
const scenarioController = require('../controllers/scenario.controller');
const themeController = require('../controllers/theme.controller');
const resourceController = require('../controllers/resource.controller');
// Après
const { requireAuth } = require('../middlewares/auth/auth.middleware');
const requireRole = require('../middlewares/auth/role.middleware');
const scenarioValidation = require('../middlewares/scenario-validation');
const { scenarioValidator } = require('../validators/scenario.validator');
scenarioValidation
// admin.router.js
const adminRouter = require('express').Router();


// Protection appliquée UNE SEULE FOIS pour toutes les routes de ce fichier
adminRouter.use(requireAuth, requireRole('moderator', 'admin'));

adminRouter.route('/report')
    .get(adminController.getAllReports)

  adminRouter.route('/report/:reportId')  
    .patch(adminController.updateReportStatus)

adminRouter.route('/scenarios')
.get(adminController.getAllScenariosPending)


adminRouter.route('/scenarios/:scenarioId/status')
.patch(adminController.updateScenarioStatus)

adminRouter.route('/scenarios/:scenarioId')
.patch(requireRole('admin'), scenarioValidation(scenarioValidator), adminController.editScenario)
.delete(requireRole('admin'), adminController.deleteScenario)

adminRouter.route('/themes')
.get(adminController.getAllThemesPending)

adminRouter.route('/themes/:themeId/status')
.patch(adminController.updateThemeStatus)

adminRouter.route('/resources')
    .get(resourceController.getAllResourcesAdmin);

adminRouter.route('/users')
.get(requireRole('admin'), adminController.getAllUsers)

adminRouter.route('/users/:userId/role')
.patch(requireRole('admin'), adminController.updateRole)



module.exports = adminRouter;
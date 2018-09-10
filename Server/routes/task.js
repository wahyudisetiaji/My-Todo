var express = require('express');
var router = express.Router();
const isLogin = require('../middlewares/isLogin')
const TaskController = require('../controllers/task-controller');

/* GET taks listing. */
router.get('/', isLogin, TaskController.findTask)
router.get('/priority/', isLogin, TaskController.findTaskPriority)
router.get('/done/', isLogin, TaskController.findTaskDone)
router.get('/task/:id', isLogin, TaskController.findOneTask)
router.post('/', isLogin, TaskController.createTask);
router.delete('/:id', isLogin, TaskController.deleteTask);
router.put('/:id', isLogin, TaskController.updateTask);
router.put('/status/:id', isLogin, TaskController.updateStatusTask)


module.exports = router;
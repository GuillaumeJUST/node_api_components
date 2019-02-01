const Todo = require('./todo');
const TodoController = require('./todosController')(Todo);
const TodoValidation = require('./todosValidation');

const router = require('express').Router();

router.get('/', TodoController.GetAllTodo);
router.post('/',
    TodoValidation.getValidations('create'),
    TodoValidation.checkValidationResult,
    TodoController.PostTodo
);
router.get('/:todo_id',
    TodoValidation.getValidations('findById'),
    TodoValidation.checkValidationResult,
    TodoController.GetTodo
);
router.put('/:todo_id',
    TodoValidation.getValidations('update'),
    TodoValidation.checkValidationResult,
    TodoController.UpdateTodo
);
router.put('/:todo_id/completed',
    TodoValidation.getValidations('findById'),
    TodoValidation.checkValidationResult,
    TodoController.UpdateCompletedTodo
);
router.delete('/:todo_id',
    TodoValidation.getValidations('findById'),
    TodoValidation.checkValidationResult,
    TodoController.DeleteTodo
);

module.exports = router;

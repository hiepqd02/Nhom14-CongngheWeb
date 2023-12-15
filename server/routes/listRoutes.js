const express = require('express');
const ListRouter = express.Router();
const listController = require('../Controllers/listController')

ListRouter.post('/create', listController.create);
ListRouter.get('/:id', listController.getAll);
ListRouter.delete('/:boardId/:listId', listController.deleteById);
ListRouter.put('/:boardId/:listId/update-title', listController.updateListTitle);
ListRouter.post('/change-list-order', listController.updateListOrder);
ListRouter.post('/change-card-order', listController.updateCardOrder);

module.exports = ListRouter
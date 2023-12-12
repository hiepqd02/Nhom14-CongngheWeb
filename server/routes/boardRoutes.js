const express = require("express");
const BoardRouter = express.Router();
const boardController = require('../Controllers/boardController')

BoardRouter.post('/:boardId/add-member', boardController.addMember);
BoardRouter.put('/:boardId/update-background', boardController.updateBackground);
BoardRouter.put('/:boardId/update-board-description', boardController.updateBoardDescription);
BoardRouter.put('/:boardId/update-board-title', boardController.updateBoardTitle);
BoardRouter.post('/create', boardController.create);
BoardRouter.get('/:id', boardController.getById);
BoardRouter.get('/:id/activity', boardController.getActivityById);
BoardRouter.get('/', boardController.getAll);

module.exports = BoardRouter;

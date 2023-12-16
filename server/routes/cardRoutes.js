const cardController = require('../Controllers/cardController');
const express = require('express');
const CardRouter = express.Router();



CardRouter.post('/create', cardController.create);
CardRouter.get('/:boardId/:listId/:cardId', cardController.getCard);
CardRouter.delete('/:boardId/:listId/:cardId/delete-card', cardController.deleteById);
CardRouter.put('/:boardId/:listId/:cardId', cardController.update);

// Comment
CardRouter.post('/:boardId/:listId/:cardId/add-comment', cardController.addComment);
CardRouter.put('/:boardId/:listId/:cardId/:commentId', cardController.updateComment);
CardRouter.delete('/:boardId/:listId/:cardId/:commentId', cardController.deleteComment);

// Member
CardRouter.post('/:boardId/:listId/:cardId/add-member', cardController.addMember);
CardRouter.delete('/:boardId/:listId/:cardId/:memberId/delete-member', cardController.deleteMember);

// Label
CardRouter.post('/:boardId/:listId/:cardId/create-label', cardController.createLabel);
CardRouter.put('/:boardId/:listId/:cardId/:labelId/update-label', cardController.updateLabel);
CardRouter.delete('/:boardId/:listId/:cardId/:labelId/delete-label', cardController.deleteLabel);
CardRouter.put('/:boardId/:listId/:cardId/:labelId/update-label-selection', cardController.updateLabelSelection);

// Checklist
CardRouter.post('/:boardId/:listId/:cardId/create-checklist', cardController.createChecklist);
CardRouter.delete('/:boardId/:listId/:cardId/:checklistId/delete-checklist', cardController.deleteChecklist);
CardRouter.post('/:boardId/:listId/:cardId/:checklistId/add-checklist-item', cardController.addChecklistItem);
CardRouter.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-completed', cardController.setChecklistItemCompleted);
CardRouter.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-text', cardController.setChecklistItemText);
CardRouter.delete('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/delete-checklist-item', cardController.deleteChecklistItem);

// Due date
CardRouter.put('/:boardId/:listId/:cardId/update-dates', cardController.updateStartDueDates);
CardRouter.put('/:boardId/:listId/:cardId/update-date-completed', cardController.updateDateCompleted);

// Attachment
CardRouter.post('/:boardId/:listId/:cardId/add-attachment', cardController.addAttachment);
CardRouter.put('/:boardId/:listId/:cardId/:attachmentId/update-attachment', cardController.updateAttachment);
CardRouter.delete('/:boardId/:listId/:cardId/:attachmentId/delete-attachment', cardController.deleteAttachment);

// Cover
CardRouter.put('/:boardId/:listId/:cardId/update-cover', cardController.updateCover);

module.exports = CardRouter
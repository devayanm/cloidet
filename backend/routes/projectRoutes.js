const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, createProject);

router.get('/', authMiddleware, getProjects);

router.get('/:id', authMiddleware, getProjectById);

router.put('/:id', authMiddleware, updateProject);

router.delete('/:id', authMiddleware, deleteProject);

router.post('/:id/files', authMiddleware, addFile);

router.put('/:projectId/files/:fileId', authMiddleware, updateFile);

router.delete('/:projectId/files/:fileId', authMiddleware, deleteFile);

module.exports = router;

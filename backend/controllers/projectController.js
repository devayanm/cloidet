const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProject = new Project({
      user: req.user.id,
      name,
      description,
      files: [],
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    project.name = name || project.name;
    project.description = description || project.description;

    project = await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await project.remove();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addFile = async (req, res) => {
    try {
      const { name, language } = req.body;
      let project = await Project.findById(req.params.id);
  
      if (!project) return res.status(404).json({ msg: 'Project not found' });
      if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
  
      const newFile = { name, content: '', language };
      project.files.push(newFile);
  
      project = await project.save();
      res.json(project);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  exports.updateFile = async (req, res) => {
    try {
      const { content } = req.body;
      let project = await Project.findById(req.params.projectId);
  
      if (!project) return res.status(404).json({ msg: 'Project not found' });
      if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
  
      const file = project.files.id(req.params.fileId);
      if (!file) return res.status(404).json({ msg: 'File not found' });
  
      file.content = content;
      project = await project.save();
      res.json(file);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  exports.deleteFile = async (req, res) => {
    try {
      let project = await Project.findById(req.params.projectId);
  
      if (!project) return res.status(404).json({ msg: 'Project not found' });
      if (project.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
  
      project.files = project.files.filter(file => file.id !== req.params.fileId);
      project = await project.save();
      res.json({ msg: 'File removed' });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
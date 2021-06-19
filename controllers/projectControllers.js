const Project = require('../models/projectModel');

const addProject = (args) =>
{
    let project = new Project(
        {
            name: args.name,
            details: args.details,
            coderId: args.projectId
        });
    return project.save();
}

const deleteProject = async (args) =>
{
    await Project.findByIdAndDelete(args.id);
    return { msg: 'Project Removed'};
}

const updateProject = async (args) =>
{
    project = await Project.findByIdAndUpdate(args.id, (args.name) ? { name  } : { details });
    return project;
}

const getMutualProjects = () =>
{
    const mutualProjectIds = projectIds1.filter((id1) => { return projectIds2.indexOf(id1) > -1; });
    return Project.find({ id: mutualProjectIds });
}

module.exports = { addProject, updateProject, deleteProject, getMutualProjects };
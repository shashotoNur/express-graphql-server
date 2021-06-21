const Project = require('../models/projectModel');

const getProjects = async () =>
{
    const projects = await Project.find({});
    return projects;
}

const getCoderProjects = async (coderId) =>
{
    const coderProjects = await Project.find({ coderIds: coderId });
    return coderProjects;
}

const getProject = async (id) =>
{
    const project = await Project.findById(id);
    return project;
}

const addProject = async (args) =>
{
    const project = new Project(
        {
            name: args.name,
            details: args.details,
            coderIds: args.coderIds
        });
    const addedProject = await project.save();
    return addedProject;
}

const deleteProject = async (args) =>
{
    const deletedProject = await Project.findByIdAndDelete(args.id);
    return deletedProject.id;
}

const updateProject = async (args) =>
{
    const updatedProject = await Project.findByIdAndUpdate(args.id, args, {new: true});
    return updatedProject;
}

const getMutualProjects = async (coder1Id, coder2Id) =>
{
    const coder1Projects = await getCoderProjects(coder1Id);
    const coder2Projects = await getCoderProjects(coder2Id);

    var mutualProjects = [];
    coder1Projects.forEach(coder1Project => {
        coder2Projects.forEach(coder2Project => {
            if(coder1Project.id == coder2Project.id) mutualProjects.unshift(coder1Project);
        });
    });

    return mutualProjects;
}

module.exports = { getProjects, getCoderProjects, getProject, addProject, updateProject, deleteProject, getMutualProjects };
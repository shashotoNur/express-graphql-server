const Coder = require('../models/coderModel');
const Project = require('../models/projectModel');

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
    const coder1 = await Coder.findById( coder1Id );
    const coder2 = await Coder.findById( coder2Id );
    const coder1ProjectIds = coder1.projectIds;
    const coder2ProjectIds = coder2.projectIds;

    const mutualProjectIds = coder1ProjectIds.filter((id1) => { return coder2ProjectIds.indexOf(id1) > -1; });
    const mutualProjects = await Project.find({ _id: { $in: mutualProjectIds } });

    return mutualProjects;
}

module.exports = { addProject, updateProject, deleteProject, getMutualProjects };
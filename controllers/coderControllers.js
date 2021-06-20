const Coder = require('../models/coderModel');
const Project = require('../models/projectModel');

const addCoder = async (args) =>
{
    const coder = new Coder(
        {
            name: args.name,
            level: args.level,
            projectIds: args.projectIds
        });
    const savedCoder = await coder.save();
    return savedCoder;
}

const updateCoder = async (args) =>
{
    const updatedCoder = await Coder.findByIdAndUpdate(args.id, args, {new: true});
    return updatedCoder;
}

const deleteCoder = async (args) =>
{
    const deletedCoder = await Coder.findByIdAndDelete(args.id);
    return deletedCoder.id;
}

const getMutualCoders = async (project1Id, project2Id) =>
{
    const project1 = await Project.findById( project1Id );
    const project2 = await Project.findById( project2Id );
    const project1CoderIds = project1.coderIds;
    const project2CoderIds = project2.coderIds;

    const mutualCoderIds = project1CoderIds.filter((id1) => { return project2CoderIds.indexOf(id1) > -1; });
    const mutualCoders = await Coder.find({ _id: { $in: mutualCoderIds } });

    return mutualCoders;
}

module.exports = { addCoder, updateCoder, deleteCoder, getMutualCoders };
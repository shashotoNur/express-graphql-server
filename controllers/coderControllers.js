const Coder = require('../models/coderModel');

const getCoders = async () =>
{
    const coders = await Coder.find({});
    return coders;
}

const getProjectCoders = async (projectId) =>
{
    const coders = await Coder.find({ projectIds: projectId });
    return coders;
}

const getCoder = async (id) =>
{
    const coder = await Coder.findById(id);
    return coder;
}

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
    const project1Coders = await getProjectCoders(project1Id);
    const project2Coders = await getProjectCoders(project2Id);

    var mutualCoders = [];
    project1Coders.forEach(project1Coder => {
        project2Coders.forEach(project2Coder => {
            if(project1Coder.id == project2Coder.id) mutualCoders.unshift(project1Coder);
        });
    });

    return mutualCoders;
}

module.exports = { getCoders, getProjectCoders, getCoder, addCoder, updateCoder, deleteCoder, getMutualCoders };
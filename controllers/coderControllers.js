const Coder = require('../models/coderModel');

const addCoder = (args) =>
{
    let coder = new Coder(
        {
            name: args.name,
            age: args.age
        });
    return coder.save();
}

const updateCoder = async (args) =>
{
    coder = await Coder.findByIdAndUpdate(args.id, (args.name) ? { name  } : { level });
    return coder;
}

const deleteCoder = async (args) =>
{
    await Coder.findByIdAndDelete(args.id);
    return { msg: 'Coder Removed'};
}

const getMutualCoders = (coderIds1, coderIds2) =>
{
    const mutualCoderIds = coderIds1.filter((id1) => { return coderIds2.indexOf(id1) > -1; });
    return Coder.find({ id: mutualCoderIds });
}

module.exports = { addCoder, updateCoder, deleteCoder, getMutualCoders };
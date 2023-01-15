const TagModel = require('../models/Tag');


const createTag = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: `Please provide all values!` });
        }

        const tag = await TagModel.create({
            name: req.body.name
        });

        res.status(201).json(tag);
    } catch (error) {
        return res.status(500).json({ message: `Error create Tag: ${error}` });
    }
};

const allTags = async (req, res) => {
    try {
        const allTags = await TagModel.find({});

        res.status(200).json(allTags);
    } catch (error) {
        return res.status(500).json({ message: `Error all Tags: ${error}` });
    }
};

const allSpecTags = async (req, res) => {
    try {
        const allTags = await TagModel.find({
            posts: { $in: [req.params.id] }
        });
        res.status(200).json(allTags);
    } catch (error) {
        return res.status(500).json({ message: `Error all spec Tags: ${error}` });
    }
};

// const useTag = async (req, res) => {
//     const { questId, tagId } = req.params;

//     try {

// const 
//         const tag = await TagModel.findByIdAndUpdate(tagId, {
//             $push: [{posts: questId}]
//         });

//         const 
//     } catch (error) {

//     }
// };

const specTag = async (req, res) => {
    const id = req.params.id;

    try {
        const specTag = await TagModel.findById(id);

        res.status(200).json(specTag);
    } catch (error) {
        return res.status(500).json({ message: `Error spec Tag: ${error}` });
    }
};



const delTag = async (req, res) => {
    const id = req.params.id;

    try {
        await TagModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Tag has been deleted!' })
    } catch (error) {
        return res.status(500).json({ message: `Error del Tag: ${error}` });
    }

};


module.exports = {
    createTag, allTags, allSpecTags, specTag, delTag
};
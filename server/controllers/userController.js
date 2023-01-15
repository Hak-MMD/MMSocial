const UserModel = require('../models/User');
const TagModel = require('../models/Tag');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const BadRequestError = require('../errors/Bad_request');


const register = async (req, res) => {
    const { email, password } = req.body;
    // console.log('test');
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all values" });
        }
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            res.status(400).json({ message: 'User already exist! Email and username must be unique!' });
        }

        // const userexist = await UserModel.findOne({ username });

        // if (userexist) {
        //     return res.status(400).json({ message: 'User already exist! Username must be unique!' });
        // }



        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ email, password: hashedPassword });
        console.log(user.id);
        if (user) {
            res.status(201).json({
                message: "Registred in! Redirecting...",
                _id: user.id,
                username: undefined,
                email: user.email,
                token: generateToken(user.id),
            });
        }

    } catch (error) {
        return res.status(500).json({ message: `Error Register: ${error}` });
    }



};

const addUsername = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await UserModel.findByIdAndUpdate(req.user._id, {
            username
        }, {
            new: true
        });

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Error addUsername : ${error}` });
    }
};

const addDescription = async (req, res) => {
    try {
        const { description } = req.body;

        const user = await UserModel.findByIdAndUpdate(req.user._id, {
            description
        }, {
            new: true
        });

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Error addDescr : ${error}` });
    }
};

const addLocation = async (req, res) => {
    try {
        const { location } = req.body;

        const user = await UserModel.findByIdAndUpdate(req.user._id, {
            location
        }, {
            new: true
        });

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Error addLocation : ${error}` });
    }
};

const addHobbies = async (req, res) => {
    try {
        const { hobbies } = req.body;

        const addTag = await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { posts: concat(hobbies) }
        }, {
            new: true
        });

        res.status(200).json(addTag);
    } catch (error) {
        return res.status(500).json({ message: `Error addLocation : ${error}` });
    }
};

const login = async (req, res) => {
    const { field, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Please provide all values" });
    }
    const user = await UserModel.findOne({ field });

    if (!user) {
        return res.status(401).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials!" });
    };
    if (user && isMatch) {
        res.status(201).json({
            message: "Logged in! Redirecting...",
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }

};

const myAccount = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Error myAccount: ${error}` });
    }
};
//Mykola functionality of this route is not completed now, because auth middleware is not created yet
const whoAmI = async (req, res) => {
    const { _id, username, email } = await UserModel.findById(req.user.id)


    res.status(200).json({
        message: "My account!",
        _id: _id,
        username,
        email,
    });
};

const editUserPass = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({ message: "Please provide all values" });
        }

        const isMatch = await bcrypt.compare(password, req.user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        };

        if (isMatch) {

            const salt = await bcrypt.genSalt(10)
            const newHashedPassword = await bcrypt.hash(newPassword, salt);

            const user = await UserModel.findByIdAndUpdate(req.user._id, {
                password: newHashedPassword
            }, {
                new: true
            });

            res.status(200).json(user);
        }
    } catch (error) {

    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User has been deleted!" });
    } catch (error) {
        return res.status(500).json({ message: "Something were wrong!" });
    }
}

// const checkFollow = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const followers = await UserModel.findById(id);

//         if (followers.followers.includes(req.user.id)) {
//             res.status(200).json(followers);
//         } else {
//             res.status(200).json({ message: 'No such user!' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: "Something were wrong!" });
//     }
// };

const followUser = async (req, res) => {
    const id = req.params.id;
    // console.log(req.user.id);

    try {
        const follower = await UserModel.findByIdAndUpdate(id, {
            $push: { followers: req.user.id }
        }, {
            new: true
        });
        const following = await UserModel.findByIdAndUpdate(req.user.id, {
            $push: { following: id }
        }, {
            new: true
        });

        res.status(200).json({ follower, following });
    } catch (error) {
        return res.status(500).json({ message: `Something were wrong! ${error}` });
    }
};

const unfollowUser = async (req, res) => {
    const id = req.params.id;

    try {
        const unfollower = await UserModel.findByIdAndUpdate(id, {
            $pull: { followers: req.user.id }
        }, {
            new: true
        });

        const unfollowing = await UserModel.findByIdAndUpdate(req.user.id, {
            $pull: { following: id }
        }, {
            new: true
        });

        res.status(200).json({ unfollower, unfollowing });
    } catch (error) {
        return res.status(500).json({ message: "Something were wrong!" });
    }
};

const generateToken = (id) => {
    console.log('genToken:' + id);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
    register,
    addDescription,
    addHobbies,
    addLocation,
    addUsername,
    editUserPass,
    login,
    myAccount,
    whoAmI,
    deleteUser,
    followUser,
    unfollowUser
};
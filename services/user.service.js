//user.service.js

const User = require('../models/user.model')

const userService = {

    find: async (filter = {}, fields = null) => {
        try {
            // on passe le filtre à Mongoose
            //  si on appelle find() sans argument, Mongoose ramène tout. Si on passe un filtre, il filtre.
            const users = await User.find(filter).select(fields);
            // une fois les données récupérées, return au controller
            return users;
        }

        catch (err) {

            console.log(err);
            throw new Error(err);
        }
    },

    findById: async (id) => {
    try {
        return await User.findById(id);
    } catch (err) {
        throw err;
    }
},

// Update par un admin 
    update: async (userId, newInfos, adminId) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    ...newInfos,
                    reviewedBy: adminId, // pour audit
                    reviewedAt: new Date()
                },
                { returnDocument: 'after' }
            );
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }, 

    // Update par l'utilisateur sur son propre profil 
    updateSelf: async (userId, newInfos) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                newInfos,
                { returnDocument: 'after', runValidators: true }
            );
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = userService
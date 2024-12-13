const User = require('../models/user');


exports.getUserbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if (user) {
            // Exclude the password field from the response
            delete user.password;
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
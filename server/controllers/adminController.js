const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const Property = require("../models/property");
// dotenv
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

// Admin login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update property status
exports.updatePropertyStatus = async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.isApproved = isApproved;
    await property.save();

    res.json({ message: "Property status updated successfully", property });
  } catch (error) {
    console.error("Error updating property status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

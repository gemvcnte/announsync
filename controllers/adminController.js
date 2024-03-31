const { Admin } = require("../models/adminSchema");
const { Announcement } = require("../models/announcementSchema");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { fullName, emailAddress, password } = req.body;

    const existingAdmin = await Admin.findOne({ emailAddress });

    const [firstName, lastName] = fullName.split(" ");

    const userName =
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toLowerCase(); // Corrected

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      fullName,
      userName,
      emailAddress,
      password: hashedPassword,
    });
    await admin.save();

    // res.status(201).json({ message: "Admin has been created.", admin });
    res.status(201).json({ admin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const getAllAdmins = expressAsyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find();

    if (!admins) {
      res.status(404).json({ message: "No admins" });
    }

    res.status(200).json({ admins });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const getSpecificAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { adminId } = req.body;

    const admin = await Admin.findOne({ _id: adminId });

    if (!admin) {
      return res.status(404).json({ message: "Unable to find the admin" });
    }

    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
  }
});

const deleteAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findOneAndDelete({ _id: id });

    if (!deletedAdmin) {
      return res
        .status(404)
        .json({ message: "Admin has already been deleted" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const updateAdminPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { fullName, password } = req.body;

    const existingAdmin = await Admin.findOne({ fullName });

    if (!existingAdmin) {
      return res.status("Can't find the admin your trying to update.");
    }

    existingAdmin.password = password;
    await existingAdmin.save();

    return res
      .status(200)
      .json({ message: "Admin password has been updated successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const createAnnouncement = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, postedBy, adminId } = req.body;

    const existingAnnouncement = await Announcement.findOne({ title });

    if (existingAnnouncement) {
      return res
        .status(400)
        .json({ message: "Announcement has already been posted." });
    }

    const announcement = new Announcement({
      title,
      description,
      postedBy: "Admin",
    });

    await announcement.save();

    // res.status(201).json({ message: "Announcement has been saved" });
    res.status(201).json({ announcement });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const getAllAnnouncements = expressAsyncHandler(async (req, res) => {
  try {
    const announcements = await Announcement.find();

    if (!announcements) {
      return res.status(404).json({ message: "No announcements yet." });
    }

    return res.status(200).json({ announcements });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal server error. Please try againa later." });
  }
});

const getSpecificAnnouncement = expressAsyncHandler(async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await Announcement.findOne({ _id: announcementId });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }
    return res.json({ announcement });
  } catch (err) {
    console.error(err);
  }
});

// const updateAnnouncement = expressAsyncHandler(async (req, res) => {
//   try {
//   } catch (err) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Internal server error. Please try again later." });
//   }
// });

const deleteAnnouncement = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findOneAndDelete({
      _id: id,
    });

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .json({ message: "Announcement has already been deleted." });
    }

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const updateAnnouncement = expressAsyncHandler(async (req, res) => {});

const totalAdminAnalytics = expressAsyncHandler(async (req, res) => {
  try {
    const totalAdminsData = await Admin.countDocuments({});
    res.json({ totalAdminsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error. " });
  }
});

const totalPostsOfAdminAnalytics = expressAsyncHandler(async (req, res) => {
  try {
    const totalAnnouncement = await Announcement.countDocuments({});
    res.json({ totalAnnouncement });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  // adminLogin,
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  totalAdminAnalytics,
  totalPostsOfAdminAnalytics,
  updateAdminPassword,
  getSpecificAdmin,
};

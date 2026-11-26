
import User from "../models/User.js";

// GET: obtener todos los usuarios o filtrarlos.
const getAllUsers = async (req, res, next) => {
  try {
    const filtros = {};

    if (req.query.nombre) {
      filtros.nombre = { $regex: req.query.nombre, $options: "i" };
    }

    if (req.query.apellidos) {
      filtros.apellidos = { $regex: req.query.apellidos, $options: "i" };
    }

    if (req.query.email) {
      filtros.email = { $regex: req.query.email, $options: "i" };
    }

    if (req.query.active !== undefined) {
      filtros.active = req.query.active === "true";
    }

    const users = await User.find(filtros)
      .select("-password_hash")
      .sort({ "fecha_registro.date": -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// GET: buscar un usuario por ID.
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// POST: crear un usuario.
const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const userData = newUser.toObject();

    delete userData.password_hash;

    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// PUT: actualizar un usuario.
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password_hash");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE: eliminar un usuario.
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
      .select("-password_hash");

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuario eliminado correctamente",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

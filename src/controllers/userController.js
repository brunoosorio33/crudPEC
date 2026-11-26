
import User from "../models/User.js";

// GET /api/users: devuelve todos los usuarios, ordenados por fecha de registro.
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
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

// GET /api/users/:id: busca un usuario por su identificador.
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado con ese ID",
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

// POST /api/users: crea un usuario con los datos enviados en el cuerpo JSON.
const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    // No devolvemos el campo de contraseña en la respuesta.
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

// PUT /api/users/:id: actualiza los campos enviados y devuelve el documento nuevo.
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).select("-password_hash");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "No se pudo actualizar: Usuario no encontrado",
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

// DELETE /api/users/:id: elimina el usuario y devuelve el documento eliminado.
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
      .select("-password_hash");

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "No se pudo eliminar: Usuario no encontrado",
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

// Exportaciones con nombre para que userRoutes.js pueda importar los controladores.
export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

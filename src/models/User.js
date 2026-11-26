
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },

    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },

    apellidos: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password_hash: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },

    telefono: {
      type: String,
      trim: true,
    },

    direccion_envio: {
      type: String,
      trim: true,
    },

    fecha_registro: {
      date: {
        type: Date,
        required: true,
      },
    },

    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    id: false,
    versionKey: false,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

export default User;

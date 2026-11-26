
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },

    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },

    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },

    origen: {
      type: String,
      required: [true, "El origen es obligatorio"],
      trim: true,
    },

    tipo_tueste: {
      type: String,
      required: true,
      enum: ["claro", "medio", "oscuro"],
    },

    formato_gramos: {
      type: Number,
      required: true,
      min: 1,
    },

    notas_cata: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    disponible: {
      type: Boolean,
      required: true,
      default: true,
    },

    fecha_creacion: {
      date: {
        type: Date,
        required: true,
      },
    },

    usuario_creador_id: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
    versionKey: false,
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

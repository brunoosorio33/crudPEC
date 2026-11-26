
import Product from "../models/Product.js";

// GET: obtener todos los productos con posibilidad de filtrarlos.
const getAllProducts = async (req, res, next) => {
  try {
    const filtrosPermitidos = {
      nombre: "texto",
      descripcion: "texto",
      origen: "texto",
      tipo_tueste: "texto",
      precio: "numero",
      formato_gramos: "numero",
      stock: "numero",
      disponible: "booleano",
    };

    const filtros = {};

    for (const [campo, valor] of Object.entries(req.query)) {
      if (!filtrosPermitidos[campo]) {
        return res.status(400).json({
          success: false,
          message: `Filtro no válido: ${campo}`,
        });
      }

      if (filtrosPermitidos[campo] === "texto") {
        if (typeof valor !== "string" || !valor.trim()) {
          return res.status(400).json({
            success: false,
            message: `Valor no válido para ${campo}`,
          });
        }

        filtros[campo] = {
          $regex: valor.trim(),
          $options: "i",
        };
      }

      if (filtrosPermitidos[campo] === "numero") {
        const numero = Number(valor);

        if (valor === "" || !Number.isFinite(numero)) {
          return res.status(400).json({
            success: false,
            message: `El campo ${campo} debe ser un número`,
          });
        }

        filtros[campo] = numero;
      }

      if (filtrosPermitidos[campo] === "booleano") {
        if (valor !== "true" && valor !== "false") {
          return res.status(400).json({
            success: false,
            message: `${campo} debe ser true o false`,
          });
        }

        filtros[campo] = valor === "true";
      }
    }

    const products = await Product.find(filtros).sort({
      "fecha_creacion.date": -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET: buscar un producto por ID.
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST: crear un producto.
const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// PUT: actualizar un producto.
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE: eliminar un producto.
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

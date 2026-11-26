
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API RESTful operativa y conectada a MongoDB Atlas",
    endpoints: {
      products: "/api/products",
    },
  });
});

// Rutas de productos
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Middlewares de errores
app.use(notFound);
app.use(errorHandler);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar la conexión y después el servidor
const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;

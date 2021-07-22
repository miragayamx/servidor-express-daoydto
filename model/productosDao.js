import mongoose from "mongoose";
import * as dbConnect from "./dbConnect.js";
import productoDto from './productoDto.js';
import logger from "../winstonConfig.js";

const productoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
});

const Producto = mongoose.model("producto", productoSchema);

class productosDao {
  constructor() {
    (async () => {
      try {
        await dbConnect.connect();
		logger.info("Base de datos conectada");
      } catch (err) {
        logger.error(err);
      }
    })();
  }
  getProductos = async () => {
    try {
      return await Producto.find().lean();
    } catch (err) {
      throw err;
    }
  };
  getProductoById = async (id) => {
    try {
      return await await Producto.findById(id);
    } catch (err) {
      throw err;
    }
  };
  addProducto = async (item) => {
    try {
      const newItem = productoDto(item);
      const instance = new Producto(newItem);
      await instance.save();
    } catch (err) {
      throw err;
    }
  };
  updateProducto = async (id, item) => {
    try {
      const newItem = productoDto(item);
      await Producto.findByIdAndUpdate(id, newItem);
    } catch (err) {
      throw err;
    }
  };
  deleteProducto = async (id) => {
    try {
      await Producto.findByIdAndRemove(id);
    } catch (err) {
      throw err;
    }
  };
}

export default productosDao;
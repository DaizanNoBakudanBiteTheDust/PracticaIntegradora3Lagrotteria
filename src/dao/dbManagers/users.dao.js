import  usersModel from "./models/users.models.js";
import { logger } from "../../utils/logger.js";

export default class Users {
    constructor() {
        logger.http('Working users with DB');
    }

    getAll = async () => {
      const users = await usersModel.find().lean();
      return students.map(student => student.toObject());
  }

    getByEmail = async(email) => {
        const user = await usersModel.findOne({email}).lean();
        return user;
    }

    save = async(user) => {
        const result = await usersModel.create(user);
        return result; 
    }

    updatePass = async (email, password) => {
        try {
          const result = await usersModel.findOneAndUpdate(
            { email: email },
            { password: password },
            { new: true }
          );
    
          return result;
        } catch (error) {
          console.log(error);
        }
      };

    getUserById = async (id) => {
        const result = await usersModel.findById(id);
        console.log(result)
        return result;
    }
    
    addCartToUser = async (userId, cartId) => {
        try {
            // Buscar al usuario por su ID
            const user = await usersModel.findById(userId);
    
            if (!user) {
                req.logger.error('Usuario no encontrado');
                return;
            }
    
            if (!user.carts || user.carts.length === 0) {
                // Si el usuario no tiene un carrito, crea uno nuevo
                await usersModel.findByIdAndUpdate(userId, { $push: { carts: { cart: cartId } } }, { new: true });
            } else {
                req.logger.warn('El usuario ya tiene un carrito');
            }
        } catch (error) {
            req.logger.error('Error al agregar carrito al usuario:', error);
        }
    }

    updateRole = async (email, role) => {
        try {
          const result = await usersModel.findOneAndUpdate(
            { email: email },
            { role: role },
            { new: true }
          );
    
          return result;
        } catch (error) {
          console.log(error);
        }
      };
      
} 
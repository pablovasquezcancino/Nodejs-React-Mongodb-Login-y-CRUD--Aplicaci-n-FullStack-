import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createdAccessToken } from '../libs/jwt.js';

// como estamos trabajando con una base de datos, tenemos que hacer una funcion asincrona.
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        // el metodo save guarda el objeto en la base de datos
        const userSaved = await newUser.save(); //guardamos el usuario
        const token = await createdAccessToken({id: userSaved._id}); // creamos el token
        res.cookie('token', token); // establecemos el token en una cookie en la respuesta
        res.json({                  //  mandamos la respuesta
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });
    
        if (!userFound)
          return res.status(400).json({
            message: ["The email does not exist"],
          });
    
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          return res.status(400).json({
            message: ["The password is incorrect"],
          });
        }
    
        const token = await createdAccessToken({
          id: userFound._id,
          username: userFound.username,
        });
    
        res.cookie("token", token, {
          httpOnly: process.env.NODE_ENV !== "development",
          secure: true,
          sameSite: "none",
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      return res.sendStatus(200);
}
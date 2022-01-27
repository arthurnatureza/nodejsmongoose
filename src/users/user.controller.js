const Joi = require("joi");
require("dotenv").config();
const User = require("./users.model");

const userSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  address: Joi.string().required(),
  cep: Joi.string().required().min(8).max(10),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(6),
  privilege: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

console.log(userSchema.password);

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    console.log(result);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    let user = await User.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email já cadastrado.",
      });
    }

    const hash = await User.hashPassword(result.value.password);

    const year = new Date().getFullYear();
    const count = await User.count();
    const id = (year * 1000) + (count + 1);
    result.value.userId = id;

    delete result.value.confirmPassword;
    result.value.password = hash;

    const newUser = new User(result.value);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Usuário registrado",
    });
  } catch (err) {
    console.error("Erro no cadastro: ", err);
    return res.status(500).json({
      error: true,
      message: "Erro ao cadastrar usuário",
    });
  }
}

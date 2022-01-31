const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const salt = 10;

exports.activeUsers = async (req, res) => {
    try {
        let usersList = await User.find({
            active: true,
        });
        return res.json({
            status: 200,
            usersList: usersList,
        });
    } catch (err) {
        console.error("Erro no cadastro: ", err);
        return res.json({
            status: 500,
            error: true,
            message: "Erro ao buscar todos os usuários",
        });
    }
}

exports.allUsers = async (req, res) => {
    try {
        let usersList = await User.find();
        return res.json({
            status: 200,
            usersList: usersList,
        });
    } catch (err) {
        console.error("Erro no cadastro: ", err);
        return res.json({
            status: 500,
            error: true,
            message: "Erro ao buscar todos os usuários",
        });
    }
}

exports.addUser = async (req, res) => {
    try {
        const userSchema = req.body;
        if (userSchema.error) {
            console.log(userSchema.error.message);
            return res.json({
                status: 400,
                message: userSchema.error,
            });
        }

        let userEmail = await User.findOne({
            $and: [
                {email: userSchema.email},
                {active: true}
            ],
        });
        if (userEmail) {
            return res.json({
                error: true,
                message: "Email já cadastrado.",
            });
        }

        let userDoc = await User.findOne({
            $and: [
                {document: userSchema.document,},
                {active: true}
            ],
        });
        if (userDoc) {
            return res.json({
                error: true,
                message: "Documento já cadastrado.",
            });
        }

        const year = new Date().getFullYear();
        const count = await User.count();
        const id = (year * 10000000) + (count + 1);
        userSchema.userId = id;

        let cryptPassword = bcrypt.hashSync(userSchema.password, salt);
        userSchema.password = cryptPassword

        const newUser = new User(userSchema);
        await newUser.save();

        return res.json({
            status: 200,
            success: true,
            message: "Novo usuário castrado com sucesso.",
        });

    } catch (err) {
        console.error("Erro no cadastro: ", err);
        return res.json({
            status: 500,
            error: true,
            message: "Erro ao cadastrar usuário",
        });
    }
};

exports.deleteUser = async (req, res) => {
    let userId = parseInt(req.params.id)
    await User.findOneAndUpdate(
        {$and: [
            {userId: userId},
            {active: true}
        ]},
        {$set:{active: false}},
        {new: true},
        (err, model) => {
            if(err) {
                res.json({
                    status: 500,
                    error: true,
                    message: "Usuário não encontrado", err,
                });
            } else {
                res.json({
                    status: 200,
                    message: "Usuário excluído com sucesso.",
                });
            }
        }
    ).clone().catch((err) => {console.log(err)});
}

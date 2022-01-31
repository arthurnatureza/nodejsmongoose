const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/api', (req, res) => {
    res.status(200).send({
        success: "true",
        message: "Seja bem-vindo(a) a API Node.js + MongoDB(Mongoose)!",
        version: "1.0.0",
    });
});

router.get('/', (req, res) => {
    res.json({"Home" : "Página inicial."});
});

router.get('/activeUsers', usersController.activeUsers)

router.get('/allUsers', usersController.allUsers)

//router.get('/userById/:id', usersController.userById)

//router.get('/userByEmail/:email', usersController.userByEmail)

//router.get('/userByName/:name', usersController.userByName)

//router.get('/userByDocument/:document', usersController.userByDocument)

router.post('/add' , usersController.addUser);

router.delete('/delete/:id', usersController.deleteUser);

//router.update('/update', usersController.update);

module.exports = router;

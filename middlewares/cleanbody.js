const sanitize = require("mongo-sanitize");

module.exports = (req, res, next) => {
  try {
    req.body = sanitize(req.body);
    next();
  } catch (error) {
    console.log("Erro na limpeza do body", error);
    return res.status(500).json({
      error: true,
      message: "Erro na limpeza do body(sanitize)",
    });
  }
};
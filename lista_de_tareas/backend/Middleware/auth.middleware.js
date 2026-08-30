export const authMiddleware = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect("/usuarios/login");
  }
  next();
};
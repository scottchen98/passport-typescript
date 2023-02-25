import { Request, Response, NextFunction } from "express";
import { getUserById } from "../controllers/userController";
/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

export const ensureAdminAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user ? getUserById(req.user.id) : null;
  if (user && user.role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
};

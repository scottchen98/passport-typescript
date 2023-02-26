import express from "express";
import memoryStore from "../app";
const router = express.Router();
import {
  ensureAdminAuthenticated,
  ensureAuthenticated,
} from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get(
  "/admin",
  ensureAuthenticated,
  ensureAdminAuthenticated,
  (req, res) => {
    memoryStore.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        if (sessions) {
          const sessionIds = Object.keys(sessions);
          const sessionList = sessionIds.map((sid) => {
            return {
              sessionId: sid,
              userId: (sessions[sid] as any).passport.user,
            };
          });
          console.log("UPDATEEEEE: ", sessionList);
          res.render("admin", {
            allSessions: sessionList,
            currentSessionUser: req.user ? (req.user as any).name : undefined,
          });
        }
      }
    });
  }
);

export default router;

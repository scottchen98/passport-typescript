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

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

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
          console.log("CHECK HERE: ", sessionIds);
          const sessionList = sessionIds
            .filter((sid) => {
              return (
                (sessions[sid] as any).passport &&
                (sessions[sid] as any).passport.user
              );
            })
            .map((sid) => {
              return {
                sessionId: sid,
                userId: (sessions[sid] as any).passport.user,
              };
            });

          console.log("AFTER: ", sessionList);

          res.render("admin", {
            allSessions: sessionList,
            currentSessionUser: req.user ? (req.user as User).name : undefined,
          });
        }
      }
    });
  }
);

router.post("/revoke-session", (req, res) => {
  const sessionId = req.body.revokeUser;
  memoryStore.destroy(sessionId, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("REVOKED SESSION");
    res.redirect("/admin");
  });
});

export default router;

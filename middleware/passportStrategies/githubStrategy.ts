import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { findOrCreateUser } from "../../controllers/userController";
require("dotenv").config();

interface GitHubProfile {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: { value: string }[];
  provider: string;
  _raw: string;
  _json: JSON;
}

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID ? process.env.CLIENT_ID : "",
    clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : "",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Express.Request,
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile,
    done: (err?: Error | null, user?: Express.User, info?: object) => void
  ): Promise<void> => {
    const user = findOrCreateUser(Number(profile.id), profile.displayName);
    done(null, user);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;

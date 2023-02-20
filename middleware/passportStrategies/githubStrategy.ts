import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: "",
    clientSecret: "",
    callbackURL: "",
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Express.Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, user?: Express.User, info?: object) => void
  ): Promise<void> => {}
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;

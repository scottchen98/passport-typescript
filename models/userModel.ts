const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "Scott Chen",
    email: "scott@gmail.com",
    password: "scott123!",
    role: "admin",
  },
];

const userModel = {
  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (id: number, name: string) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    const newUser = {
      id,
      name,
      email: "",
      password: "",
      role: "user",
    };
    database.push(newUser);
    return newUser;
  },
};

export { database, userModel };

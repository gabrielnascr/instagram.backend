import UserRepository from "../repositories/UserRepository";

const UserService = {
  profile: async (loggedUserID) => {
    const user = await UserRepository.findById(loggedUserID);

    delete user.password;
    return user;
  },
  update: async () => {

  },
  
}

export default UserService;

import dataService from "./dataService";

const userService = {
  login
};

// TODO: Error handling
function login(username: String, password: String): Promise<any> {
  return dataService
    .post("/authorize", { grant_type: "password", username, password })
    .then((user: any) => {
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user.token));
      }

      return user;
    });
}

export default userService;

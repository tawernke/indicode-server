import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Please enter a valid email",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "usernane",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "usernane",
        message: "Username can't include @ symbol",
      },
    ];
  }

  return null;
};

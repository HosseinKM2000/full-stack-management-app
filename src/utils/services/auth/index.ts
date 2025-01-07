import { LoginType, RegisterType } from "<store>/utils/types/auth";

class Auth {
  registerData: Partial<RegisterType>;
  loginData: Partial<LoginType>;

  constructor(props: Partial<LoginType> | Partial<RegisterType>) {
    if ("userName" in props) {
      // Assuming this is register data
      this.registerData = props as Partial<RegisterType>;
      this.loginData = {}; // Set empty for loginData
    } else {
      // Assuming this is login data
      this.loginData = props as Partial<LoginType>;
      this.registerData = {}; // Set empty for registerData
    }
  }

  // ...signup and signin methods

  async signup() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(this.registerData),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      console.error("Error in signup:", error);
      return null;
    }
  }

  async signin() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: "POST",
          body: JSON.stringify(this.loginData),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      console.error("Error in signin:", error);
      return null;
    }
  }
}

export default Auth;

import { RegisterType } from "<store>/utils/types/auth";

class Auth {
  data: RegisterType;

  constructor(data: RegisterType) {
    this.data = data;
  }

  async signup() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(this.data),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      console.error("Error in signup:", error);
      return null;
    }
  }
}

export default Auth;

class Member {
  constructor() {}

  async getMembers() {
    try {
      const response = await fetch(`${process.env.API_URL}/members`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching members:", error);
      return null;
    }
  }
}

const member = new Member();
export default member;

class Member {
  constructor() {}

  async getMembers() {
    try {
      const response = await fetch("http://localhost:3000/api/members");
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

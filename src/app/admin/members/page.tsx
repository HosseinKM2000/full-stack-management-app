import MembersTable from "<store>/components/customized/MembersTable";
import member from "<store>/utils/services/member";
import style from "./style.module.css";
import Filter from "<store>/components/customized/MemberFilter";

async function getMembers() {
  // Call the getUser method
  const userData = await member.getMembers();
  return userData;
}

const Users = async () => {
  const data = await getMembers();

  return (
    <div className={style.container}>
      <div className={style.filter_box}>
        <Filter />
      </div>
      <ul>
        <MembersTable items={data} />
      </ul>
    </div>
  );
};

export default Users;

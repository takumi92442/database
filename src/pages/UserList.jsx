import { useEffect, useState } from "react";
import { getUsers } from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  return (
    <>
      <table className="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th>学生証番号</th>
            <th>学生氏名</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.学生証番号}>
                <td>{user.学生証番号}</td>
                <td>{user.学生氏名}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

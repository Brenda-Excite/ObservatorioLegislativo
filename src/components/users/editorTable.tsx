import "../../styles/search.css";

interface User {
  id: string;
  user_id: string;
  displayName: string;
  email: string;
  password: string;
  type_user: { label: string; value: number };
}

const UsersTable = () => {
  return (
    <div className="sombraTable">
      <h2>hola</h2>
    </div>
  );
};

export default UsersTable;

import { removeAllData } from "../../../../services/user_services";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    removeAllData();
    navigate("./signin");
  };
  return (
    <div className="grid place-content-center h-dvh">
      <h1 className="text-3xl font-bold">Welcome to my website</h1>
      <button onClick={handleRemove} style={{
        padding:"1rem",
        backgroundColor:"#4CAF50",
        color:"white",
        fontSize:"1rem",
        fontWeight:"bold",
        marginTop:"1rem"
      }}>Logout</button>
    </div>
  );
}

export default HomePage;

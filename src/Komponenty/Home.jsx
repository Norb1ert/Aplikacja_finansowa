
import { useNavigate } from "react-router-dom";

export default function Home() {
const navigate = useNavigate()

const handleStart = () => {
    const user = localStorage.getItem('token')
    if(user) {
        navigate("/app/budget")
    } else {
        navigate("/register")
    }
}


    return (
        <div className="main-div-home">
            <h1 className="main-title">
            Aplikacja do zarządzania budżetem osobistym
            </h1>
            <button onClick={handleStart} className="link">Rozpocznij</button>
        </div>
    )
}
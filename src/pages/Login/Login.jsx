import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import notesImg from "../../assets/notesAnimate.svg";
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor insira um endereço de e-mail válido.");
      return;
    }

    if (!password) {
      setError("Por favor digite a senha");
      return;
    }

    setError("");

    // Chamada de API de Login
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Lidar com resposta de login bem-sucedido
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Lidar com erro de login
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Ocorreu um erro inesperado. Por favor, tente novamente!");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center mt-36">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 font-medium">Login</h4>

            <input
              type="text"
              name="inputLogin"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 font-normal text-xs pb-1">{error}</p>
            )}

            <button type="onSubmit" className="btn-primary">
              Entrar
            </button>

            <p className="text-sm text-center mt-4 font-medium">
              Ainda não tem uma conta?{" "}
              <Link
                to="/singUp"
                className="font-medium text-primary underline hover:text-green-500"
              >
                Inscreva-se aqui.
              </Link>
            </p>
          </form>
        </div>

        <div className="flex justify-center h-[120px] w-[120px] sm:h-[350px] sm:w-[350px] absolute top-[15%] sm:top-[30%] sm:left-[70%]">
          <a href="https://storyset.com/idea">
            <img
              src={notesImg}
              className="h-[120px] drop-shadow-blue sm:h-[350px]"
              alt="notesImagem"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

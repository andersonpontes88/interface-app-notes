import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import accountImg from "../../assets/accAnimate.svg";
import axiosInstance from "../../utils/axiosInstance";

function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSingUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Por favor, digite seu nome ");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor insira um endereço de e-mail válido.");
      return;
    }

    if (!password) {
      setError("Por favor crie uma senha");
      return;
    }

    setError("");
    // Chamada APi inscreva-se (singUp)
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Lidar com resposta de registro bem-sucedido
      if (response.data && response.data.error) {
        setError(error.response.message);
        return;
      }

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

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSingUp}>
            <h4 className="text-2xl mb-7">Inscreva-se</h4>

            <input
              type="text"
              name="inputInscrever"
              placeholder="Nome"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
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
              Criar conta
            </button>

            <p className="text-sm text-center mt-4">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Faça login
              </Link>
            </p>
          </form>
        </div>
        <div className="flex justify-center h-[350px] w-[350px] absolute top-[13%] sm:top-[30%] sm:left-[70%]">
          <a href="https://storyset.com/idea">
            <img
              src={accountImg}
              className="h-[120px] sm:h-[350px] drop-shadow-blue"
              alt="notesImagem"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingUp;

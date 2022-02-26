import { Link, Redirect } from "react-router-dom";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";
import * as yup from "yup";

const Login = ({ auth, setAuth }) => {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const handleSubmitForm = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user));

        setAuth(true);

        history.push("/dashboard");
      })
      .catch((err) => toast.error("Credenciais incorretas!"));
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Login</h1>
            <Input
              register={register}
              icon={FiMail}
              error={errors.email?.message}
              name="email"
              label="Email"
              placeholder="Seu melhor email"
            />
            <Input
              register={register}
              icon={FiLock}
              error={errors.password?.message}
              name="password"
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
            />
            <Button type="submit">Enviar</Button>
            <p>
              Não tem uma conta? <Link to="/signup">Faça seu cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;

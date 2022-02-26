import { Link, Redirect } from "react-router-dom";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";
import * as yup from "yup";

const Signup = ({ auth }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório!"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
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

  const handleSubmitForm = ({ name, email, password }) => {
    const user = { name, email, password };

    api
      .post("/user/register", user)
      .then((response) => {
        toast.success("Conta criada com sucesso!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, tente outro email!"));
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              icon={FiUser}
              error={errors.name?.message}
              name="name"
              label="Nome"
              placeholder="Seu nome completo"
            />
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
            <Input
              register={register}
              icon={FiLock}
              error={errors.passwordConfirm?.message}
              name="passwordConfirm"
              label="Confirmar senha"
              placeholder="Confirmação da senha"
              type="password"
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça <Link to="/login">Login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Signup;

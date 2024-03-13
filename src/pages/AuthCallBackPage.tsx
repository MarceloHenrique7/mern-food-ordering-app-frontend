import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallBackPage = () => { // pagina para onde iremos redirecionar o usuario
  const navigate = useNavigate();
  const { user } = useAuth0(); // temos acesso ao user logado
  const createUser = useCreateMyUser(); //createUser e a função asyncrona que vem de MyUserApi "mutateAsync: createUser"

  const hasCreatedUser = useRef(false) // isso vai ser usado para ter certeza que o useEffect abaixo e executado apenas uma vez || o useRef ele armazena o valor do estado do valor, sempre que o estado muda não aciona o componente para rederizar novamente

  useEffect(() => {
    if(user?.sub && user?.email && !hasCreatedUser.current) { // user.sub armazena o id do user, execute isso se hasCreatedUser for false
        createUser.mutateAsync({ auth0Id: user.sub, email: user.email })
        hasCreatedUser.current = true // agora o user foi criado
    }
    navigate("/") // apos essa criação do usuario iremos redirecionar-lo para home
  }, [createUser, navigate, user]);
  return <>Loading...</> // enquanto ocorre o user effect sera exibido isso para o usuario
}



export default AuthCallBackPage
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
    onCheckout: (userFormData: UserFormData) => void; // criamos essa propiedade que e uma função que recebe um userFormData do tipo UserFormData e não retorna nada (void)
    disabled: boolean; 
    /* criamos essa propiedade disabled

        o uso dela vai ser pra saber se o usuário adicionou algo no carrinho

        ou seja se cartItems === 0 não queremos exibir o botão de checkout
        porque não há items no carrinho
    
    */
    isLoading: boolean; // indica o estado de carregamento, quando fizermos uma request a partir do clique nesse chekoutButton
}


const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => { // desestruturamos essas props do nosso tipo

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0(); 
    /* 
    isAuthenticated para saber se o usuário está logado,
    
    isLoading que nos diz se o processo de verificar
    se o usuário está autenticado está em andamento.

    loginWithRedirect nos permite fazer com que o usuário faça login e após
    isso seja redirecionado para página onde estava
    
    */

    const { pathname } = useLocation();
    // acessamos a URL atual através do hook useLocation, para redirecionarmos o usuário de volta
    
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()
    // função para pegar o usuario logado

    const onLogin = async () => {
        // quando usuário clicar no botão vai vim para essa função
        
        await loginWithRedirect({
            //aqui chamamos o metodo de loginWithRedirect
            appState: {
                // quando usuário fizer login ele vai ser retornado para a url que foi salva antes do clique no botão
                returnTo: pathname
            }
        })
    }
    if (!isAuthenticated) { 
        // se o usuário não estiver authenticado, então mandamos um button pedindo para ele fazer login para conseguir ir pro checkout
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Log in to check out</Button>
    }

    if(isAuthLoading || !currentUser || isLoading) {
        /*  se o processo de authenticação ainda estiver acontecendo
            ou se o usuario atual ainda não foi encontrado "currentUser"
            ou se nos fizermos a request para criar um CheckoutSession a partir do click nesse CheckoutButton, e essa request ainda estiver acontecendo
            
            Exibimos um botão de carregamento.

        */ 
        return <LoadingButton />
    }
    return (
        <Dialog> {/* esse dialog e um componente do shadCn, ele vai ser nosso popup que aparece ao clicar para ir para o checkout */}
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1"> {/* disabled vai indicar se o o button vai estar desabilitado ou não, e aqui e o nosso button, passamos algumas classes para definir a cor de background do button, e também o flex-1 para preencher todo espaço disponivel */}
                    Go to checkout
                </Button>
            {/* aqui e o nosso button clicavel, quando for clicado será aberto o conteudo do dialog */}
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50"> 

            <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Detail" buttonText="Continue to payment"/>


            {/* 
            aqui vai o nosso conteudo do dialog 
            
            max-w-[425px] denifimos que ele terá uma largura de 425px
            md:min-w-[700px] aqui definimos que ele terá 700px para telas médias
            bg-gray-50 e um background cinza

            <UserProfileForm /> aqui queremos exibir o formulario que confirma os dados
            do usuário como o endereço, cidade, país e nome

            passamos o currentUser (usuario atual que está logado) para esse componente,
            passamos uma função que manipula o salvamento desse form onSave, passamos para onSave a função que recebemos como parâmetro desse componente onCheckout
            passamos o estado de carregamento da busca do usuario (isGetUserLoading)

            passamos title="Confirm Delivery Detail" o titulo do nosso formulario de usuario
            passamos buttonText="Continue to payment" o texto do botão de submit do nosso formulario de usuario

            */}

            </DialogContent>
        </Dialog>
     )
}

export default CheckoutButton;
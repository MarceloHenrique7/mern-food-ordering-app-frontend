import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CheckoutSessionRequest = { // criamos um tipo para nossa request
    cartItems: { // iremos receber o carrinho (cartItems)
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    // esse array "[]" significa que no body da request iremos receber um array, ou seja cartItems vai ser um array 
    
    deliveryDetails: { // informamos que também vamos receber os detalhes da entrega, que vai vim do formulario de usuario, antes do usuario ir para o chckout ele vai confirmar novamente esses deliveryDetails
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };

    restaurantId: string; // também teremos no body o restaurantId
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => { // recebemos os dados na request para criar a requisição para nosso backend
        const accessToken = await getAccessTokenSilently(); // aqui acionamos a função de buscar pelo token

        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkoutSessionRequest)
        });

        if(!response.ok) { // se a resposta não for ok lançamos um erro de volta
            throw new Error("Unable to create checkout session")
        }

        return response.json() // se tudo for ok, retornamos a resposta convertido para json
    };

    const { mutateAsync: createCheckoutSession , isLoading, error, reset } = useMutation(createCheckoutSessionRequest)
    /*
        Então nos usamos o useMutation para conseguir ter acesso aos retorno e propiedades da nossa função que faz a request ("createCheckoutSessionRequest")
        passamos para useMutation a nossa função de fazer a request pro back end "createCheckoutSessionRequest"

        então agora podemos desestruturar alguma propiedades dessa função que faz a request

        mutateAsync: createCheckoutSession, nomeamos o "mutateAsync" para "createCheckoutSession", então a partir dessa propiedade "createCheckoutSession",
        iremos iniciar uma mutação (ou seja o processo de criação) fazendo a request pro backend,

        isLoading - que indica se o processo da request está em andamento ou não
        error - indica se ocorreu algum erro da resquest,

        reset - é para resetar o error, caso dê erro

    */

    if (error) { // se deu algum erro nessa request
        toast.error(error.toString()) // enviamos para o usuário uma mensagem usando toast que e um componente de card personalizado para exibir mensagens, então passamos o erro
        reset() // depois de exibir a mensagem de erro pelo toast, damos um reset para a mensagem não ficar aparecendo na interface do usuário
    }

    return {createCheckoutSession, isLoading} // retornamos para quem vai usar essa função, retornamos a função de criar e fazer a request (createCheckoutSession), e o isLoading
}
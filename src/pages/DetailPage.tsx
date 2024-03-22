import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types"; // aqui mudamos apenas o nome desse import porque já temos um igual acima
import { useState } from "react";
import { useParams } from "react-router-dom"

export type CartItem = { // criamos um tipo para nosso cartItem
    _id: string; // definimos que teremos um _id
    name: string; // definimos que teremos um name
    price: number; // definimos que teremos um price
    quantity: number; // definimos que teremos um quantity
}

const DetailPage = () => {

    const { restaurantId } = useParams();
    // pegamos o id do restaurant através do useParams do react

    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    // pegamos o restaurant e o isLoading da nossa função "useGetMyRestaurant"

    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
    // pegamos dessa nossa função "useCreateCheckoutSession", uma função para criar e fazer nossa request, e o isLoading que nos informa o carregamento da request, renomeamos o isLoading para "isCheckoutLoading" para não dar conflito com os outros isLoading desse arquivo

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // aqui obtemos o carrinho que foi salvo no storage do navegador 
        // e verificamos se ele existe
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return storedCartItems ? JSON.parse(storedCartItems) : [] // se esse cartItems (carrinho de item) estiver no storage do navegador, nos fazemos um parse desse cartItems para json, e definimos ele como o state inicial para cartItems, se não apenas definimos inicialmente uma lista vazia

    })

    const addToCart = (menuItem: MenuItemType) => {
        // função para adicionar o item no "cartItems" (carrinho)
        setCartItems((prevCartItems) => {
            // aqui pegamos todos items que já existiam no cartItems ("prevCartItems")

            // iremos fazer 3 coisas aqui

            // 1. checar se o item já existe no cartItems
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)
            // então aqui verificamos em prevCartItems que são todos items que já existe no array e verificamos se o _id do item atual (cartItem) que esta sendo percorrido é igual ao _id do item recebido (menuItem)
            
            let updatedCartItems; // apenas inicializamos essa variavel, porque ela depende dos proximos cenarios abaixo

            // 2. se o item já existe no cartItems atualizamos a quantidade dele
            if(existingCartItem) { // se o item já existir no cartItems
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
                /*
                    Aqui atualizamos a variavel updatedCartItems que contem nosso array dos items atualizado,
                    pegamos todos items já existente no "cartItems" pelo (prevCartItems), então fazemos um map por ele

                    "cartItem" representa cada objeto que está sendo percorrido

                    verificamos novamente se os _id são iguais, se forem isso significa que esse item já existe e precisamos
                    atualizar a sua quantidade no carrinho (cartItems), então passamos um objeto {} pegando todas propiedades
                    já existente nesse item atual que está sendo percorrido "...cartItem", após isso alteramos apenas a propiedade
                    quantity desse item, adicionando a quantity + 1,

                    caso ele não exista no cartItems, então significa que é a primeira vez dele,
                    apenas adicionamos o item no cartItems.
                */
            } else {
            // 3.  se o item não existe no cartItems, então estamos adicionando um novo item
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            /*
            updatedCartItems = [
                    ...prevCartItems,

            aqui pegamos tudo que já existe no cartItems, e adicionamos mais um objeto ao array cartItems

            criamos o id, name, price, se ele caiu nesse else significa que esse item não existe no carrinho
            então definimos a quantity incia padrão como 1
            */
            
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            /* 
                essa linha serve para salvarmos os items no local storage do navegador
                porque se o usuario não estiver logado, e fizer login estando com os items já selecionado no carrinho, após o login os seus items no carrinho
                vão ser resetados após ele voltar para página 
            */
            
            

            return updatedCartItems // retornamos o cartItems Atualizado
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        // essa função remove o Item no nosso carrinho (CartItems)
        setCartItems((prevCartItems) => {
            // atualizamos nosso cartItems chamando sua função que atualiza seu state
            const updatedCartItems = prevCartItems.filter((item) => item._id !== cartItem._id)
            /*
                Aqui apenas fazemos um filter pelo nosso array que já existe,
                ele irá nos retornar tudo que já existe menos o nosso cartItem
            */

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            /* 
                essa linha serve para salvarmos os items no local storage do navegador
                porque se o usuario não estiver logado, e fizer login estando com os items já selecionado no carrinho, após o login os seus items no carrinho
                vão ser resetados após ele voltar para página 
            */

            return updatedCartItems // retornamos o novo cartItems atualizado
        })
    }
     
    /*
        inicializamos cartItems como vazio "[]"
        "cartItems" será um array de items, o item e do tipo "CartItem"
    */

    const onCheckout = async (userFormData: UserFormData) => {
        // aqui criamos uma função para lidar com checkout, recebemos um usuario do tipo UserFormData nessa função

        if(!restaurant) { // verificamos se o restaurant existe, se não existir não podemos continuar o processo de criar o checkoutSession
            return;
        }

        const checkoutData = { // estamos criando os dados que vamos enviar no body da request para nossa função de criar o CheckoutSession
            cartItems: cartItems.map((cartItem)=> ({ 
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),

                /*
                    A sintaxe no "map" que fazemos: (cartItem) => "({})" - isso nos retorna automaticamente oque estamos fazendo dentro do map
                    passamos as propiedades necessaria para nosso body da request, quando o usuário fazer a request para nossa API de criar checkoutSession no backend
                */
            })),
            restaurantId: restaurant?._id, // passamos o restaurantId para nosso body
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string, // dizemos que é uma string
            } // passamos o delivey Details para o nosso body
        };

        const data = await createCheckoutSession(checkoutData)

        window.location.href = await data.url; 
        /* 
            "window.location.href" estamos enviando o user para essa url
            essa url nos obtemos na resposta da nossa api depois de criar o CheckoutSession
        */
    }

    if(isLoading || !restaurant) { // se isLoading estiver em estado de carregamento (true), ou se não tivermos um restaurante
        return "Loading..."; // retornamos nessa page essa mensagem
    }

  return (  
    <div className="flex flex-col gap-10"> {/* display vai ser flex, vai ser em coluna e tem um espaçamento de 10 (gap-10) */}
        <AspectRatio ratio={16/5}>
            <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
            {/* 
                Aqui vai a imagem do restaurante
                usamos AspectRatio que vem do shadCn
                para trabalhar com imagens

                ratio={16 / 5} e a proporção para a nossa imagem
                
                rounded-md: arredondamos as bordas da imagem "md" significa arredondar a um nivel medio

                w-full: ultilizar 100% da largura do elemento pai
                h-full: ultilizar 100% da altura do elemento pai

                object-cover: Esta classe é usada para garantir que a imagem de fundo (ou conteúdo dentro do elemento)
                cubra todo o espaço disponível no elemento
            */}
        </AspectRatio>

        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-10">
            {/*
                grid: Define um layout de grade para o elemento.
                
                md:grid-cols-[4fr_2fr]: Define o número de colunas da grade para diferentes tamanhos de tela.
                Aqui, para telas de tamanho médio (md), o layout da grade é definido como duas colunas, sendo
                a primeira com uma largura de 4 frações (ou seja, 4 partes iguais do espaço disponível) e a
                segunda com uma largura de 2 frações. Isso significa que a primeira coluna será duas vezes mais
                larga do que a segunda coluna.


                gap-5: Define o espaçamento entre os elementos da grade como 5 (em unidades especificadas pelo
                sistema de espaçamento do Tailwind CSS).

                md:px-32: Define o preenchimento horizontal (esquerda e direita) para telas de tamanho médio (md)
                como 32 unidades especificadas pelo sistema de espaçamento do Tailwind CSS. Isso cria um preenchimento
                de 32 pixels nos lados esquerdo e direito do elemento.
            
            */}
            <div className="flex flex-col gap-10"> {/* essa e a div que aparece os items a esquerda */}
                <RestaurantInfo restaurant={restaurant}/> {/* passamos para nosso componente o restaurant */}
                <span className="text-2x1 font-bold tracking-tight">Menu</span> {/* aqui e apenas um titulo indicando que abaixo virá o menu desse restaurante */}
                {restaurant.menuItems.map((menuItem) => (
                    <MenuItem menuItem={menuItem} addToCart={()=> addToCart(menuItem)}/>
                ))}
                {/*
                    {restaurant.menuItems.map((menuItem) => (
                    <MenuItem menuItem={menuItem}/>
                    ))}

                    fazemos um map pelo array de items e então passamos cada item
                    para nosso componente que renderiza um Item
                */}
            </div>
            
            <div>
                <Card> {/* usaremos o componente card do shadCn */}
                    <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                    <CardFooter> {/* adicionamos um componente  de checkout aqui */}
                        <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading}/>
                        {/* passamos as propiedade para nosso botão de checkout */}
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default DetailPage
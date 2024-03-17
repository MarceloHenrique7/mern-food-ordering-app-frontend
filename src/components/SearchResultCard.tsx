import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant
}

// esse e o card do restaurant, card onde aparece o restaurante como resultado da pesquisa, com algumas informações dele

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link to={`/detail/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group"> 
        {/* 
            aqui criamos um link que redireciona o usuario para a url de detalhes do restaurante 

            para telas grandes teremos uma grid em coluna exemplo:

            telas menores: 
                Item
                Item
                Item
            telas maiores:
                Item    Item    Item

            2fr e 3fr: Estas são frações de fr (unidade de flexibilidade de grade) que definem as proporções
            de largura das colunas. No exemplo fornecido, a primeira coluna terá uma largura de 2 partes e a
            segunda coluna terá uma largura de 3 partes. Isso significa que a segunda coluna será 1,5 vezes
            mais larga que a primeira coluna.

            gap-5 espaçamento de 5 unidades

            group: Esta classe indica que o elemento faz parte de um grupo. No contexto de Tailwind CSS, a classe
            group geralmente é usada em conjunto com as pseudo-classes group-hover, group-focus, e outras para
            aplicar estilos aos elementos quando um elemento pai está sendo interagido (por exemplo, quando o mouse
            está passando sobre o elemento pai). Isso permite criar efeitos interativos em elementos filhos com base
            na interação com o elemento pai.
        */}

        <AspectRatio ratio={16 / 6}> 
            <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover"/>
            
            {/* 
                Aqui vai a imagem do restaurante
                usamos AspectRatio que vem do shadCn
                para trabalhar com imagens

                ratio={16 / 6} e a proporção para a nossa imagem

                className="rounded-md w-full h-full object-cover"

                rounded-md: arredondamos as bordas da imagem "md" significa arredondar a um nivel medio

                w-full: ultilizar 100% da largura do elemento pai
                h-full: ultilizar 100% da altura do elemento pai

                object-cover: Esta classe é usada para garantir que a imagem de fundo (ou conteúdo dentro do elemento)
                cubra todo o espaço disponível no elemento
            */}
        </AspectRatio>
        <div>
            <h3 className="text-2x1 font-bold tracking-tight mb-2 group-hover:underline">
                {/*
                text-2x1 Define o tamanho do texto como 2 vezes o tamanho padrão.

                font-bold: Define o peso da fonte como negrito.

                tracking-tight: Define o espaçamento entre os caracteres do texto como apertado. Isso reduz o espaçamento entre os caracteres

                mb-2: Define a margem inferior do elemento como 2 unidades 

                group-hover:underline: Esta é uma regra CSS que aplica um estilo de sublinhado ao texto quando o elemento pai (ou o grupo ao qual pertence)
                está sendo interagido, como quando o mouse está passando sobre ele.
                */}
                {restaurant.restaurantName}
            </h3>
            
            <div id="card-content" className="grid md:grid-cols-2 gap-2">
            {/* 
                "grid md:grid-cols-2":
                Para telas medias ou maiores a grid vai ficar com 2 colunas
                Para telas menores a grid vai ficar com 1 coluna
                telas menores: 
                    Item
                    Item
                telas medias ou maiores:
                    Item    Item       
            */}
            <div className="flex flex-row flex-wrap">
                 {restaurant.cuisines.map((item, index) => (
                    // fazemos um map pelo array de cuisines pegando para cuisine e o seu index da posição no array, vamos exibi-lo no card
                    <span className="flex">
                        <span>{item}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot />}
                        {/*
                            <span>{item}</span>
                            {index < restaurant.cuisines.length - 1 && <Dot />}
                            
                            Nessas 2 linhas primeiro mostramos o nome da cuisine (item)
                            depois pegamos o index o item atual que estamos percorrendo no array de cuisines
                            verificamos se o index atual e menor do que no tamanho total da nossa lista de cuisines
                            se for menor nos adicionamos um ponto • que vem do componente <Dot /> da biblioteca lucide-react,
                            Por exemplo:
                                Pasta • salad • Tacos • SeaFood • Noodles

                            basicamente isso aqui
                        */}
                    </span>
                 ))}
            </div>
            <div className="flex gap-2 flex-col">
                    <div className="flex items-center gap-1 text-green-600">
                        <Clock className="text-green-600"/> {/* aqui adicionamos um icone de relogio que vem da biblioteca lucide react */}
                        {restaurant.estimatedDeliveryTime} mins {/* aqui um texto de tempo estimado de entrega do restaurante no card */}
                    </div>
                    <div className="flex items-center gap-1">
                        <Banknote />
                        Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
                        {/* 
                            aqui <Banknote /> exibimos um icone de dinheiro, esse componente vem de lucide react

                            depois um texto que informa o preço do delivery

                            (restaurant.deliveryPrice / 100) aqui nos dividimos o valor do deliveryPrice por 100
                            porque ele está em formato de centavos, por exemplo: 250, que equivale a 2,50
                            depois usamos toFixed para arredondar para duas casas decimais assim teriamos:
                            "Delivery from $2"
                        */}
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}


export default SearchResultCard;

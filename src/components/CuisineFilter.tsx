
// criamos o componente para o filter de cuisines que vai ficar ao lado esquerdo da tela ao usuário pesquisar pela cidade

import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    onChange: (cuisines: string[]) => void; // nesse tipo teremos uma função com uma lista de cuisines que são todas strings
    selectedCuisines: string[] // recebemos nesse tipo também uma lista de SeletedCuisines (Cozinhas selecionadas), que vai ser uma lista de string
    isExpanded: boolean;
    onExpandedClick: () => void; // esse tipo também tem uma função que vai lidar com a logica do isExpanded
    /* 
    isExpanded vai servir para nos dizer se o usuário clicou na opção de "ver mais", nas opções de cuisines 
    não exibiremos todas cuisines de uma vez
    
    exemplo:
        temos um array com 3 cuisines = ['salad', 'carne', 'frios']
            inicialmente exibimos apenas 2 dessas cuisine para o usuário como opção
            
            salada - 1 opção 
            carne - 2 opção
            "ver mais" - aqui temos um botão de ver mais 

            quando user clicar em ver mais, isExpanded ficará true,
            então mostraremos a 3 opção

            salada
            carne
            frios
            "ver menos" - aqui temos um botão de ver menos 

            quando user clicar em ver menos, isExpanded ficará false,
            então mostraremos apenas as 2 opção

    */
}

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandedClick }: Props) => { // desestruturamos as propiedades do nosso tipo, e recebemos essas propiedades de outro lugar
    
    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        /*
            ChangeEvent: Este é um tipo genérico em TypeScript que representa
            um evento de mudança em um elemento de formulário. Ele é usado para
            indicar que um evento ocorreu e que houve uma alteração em algum valor
            do formulário.

            <HTMLInputElement>: Este é um tipo específico que indica o tipo de elemento
            de formulário em que ocorreu o evento de mudança. No caso de HTMLInputElement,
            estamos nos referindo a elementos de entrada, como <input>.
        */

        // nessa função pegamos o evento que ocorreu naquele input, então esse evento tem varias propiedades, como o value do input

        const clickedCuisine = event.target.value // pegamos a cuisine que foi clicada
        
        // nos vamos criar um novo array baseado nesse clickedCuisine, verificando se ele está checked ou não
        const isChecked = event.target.checked  // temos acesso a essa propiedade também
        const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)
        onChange(newCuisinesList) // passamos para nosso onChange o novo array

        /*
        const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)

        aqui criamos a nova lista de cuisines,

        se essa cuisine que pegamos do event "isChecked" (ou seja for true essa propiedade), então esse nosso novo array vai ser:
            tudo que já existe no array de "selectedCuisines" mais o nosso valor que pegamos em clickedCuisine
                ex:
                    selectedCuisines = ['arroz', 'feijão', 'macarrão']
                    clickedCuisine = 'limão'
                    isChecked = true
                    então:
                        newCuisinesList = ['arroz', 'feijão', 'macarrão'] += 'limão'
                        newCuisinesList = ['arroz', 'feijão', 'macarrão', 'limão']

        se não esse nosso novo array será:
            selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine
            um array com todas as cuisines que já existe no "selectedCuisines" menos a "clickedCuisine" o valor atual
                ex:
                    selectedCuisines = ['arroz', 'feijão', 'macarrão', 'limão']
                    clickedCuisine = 'limão'
                    isChecked = false
                    então:
                        newCuisinesList = ['arroz', 'feijão', 'macarrão', 'limão'] -= 'limão'
                        newCuisinesList = ['arroz', 'feijão', 'macarrão']

        */
    }   
    
    const handleCuisinesReset = () => onChange([]) // handleCuisinesReset = armazena a nossa função de onChange que é a função que possui as cuisines, então para resetar apenas passamos esse array vazio

    return (
    <>
        <div className="flex justify-between items-center px-2"> {/* nessa div teremos um display flex justify between que espaça os elementos e o items-center que centraliza os items na vertical */}
            <div className="text-md font-semibold mb-2"> {/* definimos o tamanho do texto medio, a font e semibold, mb siginifica que a margin bottom e de 2 unidades */}
                Filter By Cuisine
            </div>
            <div onClick={handleCuisinesReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">
                Reset Filters {/* Em onClick passamos nossa função de resetar os filtros */}
            </div>
        </div>

        <div className="space-y-2 flex flex-col"> {/* essa div vai conter as cuisines, space-y-2 siginifica que teremos um espaço na vertical de 2, e o flex vai ser col, (um item embaixo do outro) */}
            {
                cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine)
                    return <div className="flex">
                            <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisinesChange}/>
                            <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} /> /* isso aqui e um icone de Check, verifica se está selecionado a cuisine atual, size=20 e o taanho do icon, e strokeWidth=3 e a expressura da linha do icon */ } 
                                {cuisine /* exibimos o nome da cuisine atual*/}
                            </Label>
                        </div>
                }) 
                /* 

                slice(0, isExpanded ? cuisineList.length : 7) - indica:

                    se isExpanded for true:
                        do nosso array "cuisineList" vá de 0 ate o final do array
                    senão:
                        do nosso array "cuisineList" vá de 0 até o indice 7

                esse slice serve para aparecer apenas as 7 opções de cuisines inicialmentes
                de acordo com o estado de isExpanded


                Pegamos aqui a nossa lista de cuisines que criamos em options
                fazemos um map pegando a (cuisine) atual ao percorrer o array.

                const isSelected = selectedCuisines.includes(cuisine)
                aqui isSelected nos retorna true ou false, Se o array
                selectedCuisines conter a palavra atual que estamos percorrendo
                pelo array

                <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisinesChange}/>
                essa linha criamos um input do tipo checkBox, damos um id a esse input para vincular com o label que e o texto
                então supondo que o cuisine atual dque estamos percorrendo seira = 'salad'
                então damos um id de: cuisine_salad para esse input

                definimos o tipo do campo type="checkbox", damos uma classe de hidden para esconder esse elemento de input - poruqe iremos interagir com ele pelo label, value definimos como nome da cuisine atual então por exemplo, value=salad

                no checked que é onde passamos se e true ou false, que esse campo de input está marcado ou não,
                definimos isso baseado na condição feita em isSelected que verifica se essa cuisine está no array de selectedCuisines,

                depois passamos um onChange chamando a função handleCuisinesChange

                <Label> vinculamos o nosso label (texto) com nosso input pelo id, então o label ficará dentro do input de checkBox

                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border-slate-300"}`}>
                
                flex - vai ser um display flex, flex-1 - vai ocupar todo espaço disponivel, items-center - vai centralizar o texto na vertical, cursor-pointer - vai adicionar o efeito de cursor nesse texto (label)
                text-sm - tamanho do texto será pequeno (small), rounded-full - adicionamos uma borda ao label, px-4 - adicionamos um espaço no eixo x (horizontal) de 2 unidades, py-2 - adicionamos um espaço no eixo y (vertical)
                font-semibold - indicia um negrito semibold para o texto

                ${isSelected ? "border border-green-600 text-green-600" : "border-slate-300"}

                aqui adicionamos um estilo baseado nessa condicional:
                    esse campo atual está selecionado? então coloque esse estilo:
                        adicionamos uma borda com a cor verde com negrito de 600
                        e o texto verde também

                    se não estiver selecionado este input de checkbox:
                        adicionamos apenas uma borda com a cor ardósia 

                
                */

            }
        </div>

        <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1"> 
            {/* 

            onClick={onExpandedClick} - vai chamar nossa função recebida como argumento
            e vai alterar o estado de "isExpanded" baseado no estado atual de "isExpanded"

            variant = link - significa que esse button e um link
            
            mt-4 - margin top de 4 unidades
            flex-1 - preencha todo espaço disponivel
            */}

            {isExpanded ? (
            <span className="flex flex-row items-center">
                View Less <ChevronUp /> {/* <ChevronUp /> e um icon */}
            </span>
            ) : (
            <span className="flex flex-row items-center">
                View More <ChevronDown /> {/* <ChevronDown /> e um icon */}
            </span>
            )}

            {/*
                isExpanded ?: siginifica que se isExpanded for true então todas opções estão
                sendo mostradas, então o button fica com o texto de "ver menos"

                se isExpanded for false, então apenas 7 opções estão sendo mostradas,
                então button fica com texto de "ver mais"
            */}

        </Button>

    </>
  )
}
export default CuisineFilter;

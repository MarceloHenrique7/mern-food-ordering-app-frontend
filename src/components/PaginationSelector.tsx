import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = { // definimos o tipo das propiedades da nossa paginação
    page:number; // vamos ter a pagina atual que o usuario esta
    pages: number; // vamos ter todas paginas necessarias para mostrar todos resultados
    onPageChange: (page: number) => void; // tambem uma função para manipular quando alterarmos a pagina, recebemos a pagina atual que o user esta
}

// esse componente vai ser nossa paginação

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
    // esse componente recebe a page, pages, e uma função par lidar com a pagina.

    const pageNumbers = []
    //    	

    for (let i = 1; i <=pages; i++) {
        pageNumbers.push(i);
    }
    /*
        Esse for e para definimos o numero de paginas em um array
        por exemplo se recebermos 
            pages=3
            adicionamos a lista pageNumbers = [1, 2, 3]
        assim tendo numero de página
    */

    return (
    <div>
        {/* usamos nosso componente "pagination" que vem do shadCn para mostrar uma paginação */}
        <Pagination>
            {/* usamos a Tag de abertura <Pagination /> para indicar nossa paginação*/}
            <PaginationContent>
                {/* usamos a Tag de abertura <PaginationContent para indicar o conteudo da paginação /> */}
                
                {page !== 1 && 
                    // se a página for igual a 1, não precisamos mostrar o botão de "< Previous" porque não há página anterior a 1
                    // se for diferente de 1 então significa que so vai aparecer esse botão quando o usuário estiver da página 2 pra cima
                    <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => onPageChange(page-1)}/>
                        {/*
                        Usamos <PaginationItem /> para indicar um item de paginação

                        <PaginationPrevious href="#" onClick={() => onPageChange(page-1)}/>
                        Essa linha indica a página anterior da nossa paginação ex:

                    obs: essa linha <PaginationPrevious .../> e um botão com texto chamado "< Previous" na página, mas a funcionalidade e a mesma

                        supondo que temos 3 páginas
                        e o usuário está na página 2
                            [pag.1, pag.2, pag.3]

                        pag.1 > indica a página anterior (previous)
                        pag.2 > indica a página atual (current)
                        pag.3 indica a proxima página (next)
                        
                        passamos para onPageChange que é a função que recebemos para lidar com as páginas
                            passamos que a página atual que também recebemos nessa função,
                            passamos a página atual - 1
                            ou seja se o user está na pagina 2 a pagina anterior a essa será a 1

                        onClick={() => onPageChange(page-1)}
                        então ao clicar nesse Link (PaginationPrevious) essa dunção do onClick será chamada
                        */}
                    </PaginationItem>
                }

            
                {pageNumbers.map((number)=>(
                  <PaginationItem>
                        <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                            {number}
                        </PaginationLink>
                  </PaginationItem>  
                ))}
                {/* 
                    Aqui fazemos um map pelo nosso array de páginas,
                    pegamos o valor atual (number) que está sendo percorrido no array,

                    exemplo:
                        teremos na página todas as páginas necessarias nesse componente:
                        então supondo que nosso array de páginas tenha 4 páginas
                        então será criado um componente de link para cada página

                        "< Previous, [1], [2], [3], [4], Next>"
                        nesse estilo.

                    Usamos <PaginationItem /> para indicar um item de paginação
                    Usamos <PaginationLink /> para indicar um Link de paginação
                    
                    onClick={() => onPageChange(number)}
                    quando usuário clicar nesse link que vai está com um valor qualquer
                    chamamos a função que lida com as páginas (essa função define a página que estamos) para renderizarmos os outros itens


                    isActive={page === number}
                    se a página atual for igual nosso number atual que estamos percorrendo no array.
                    então isso significa que o usuário está nessa página,

                    o isActive e usado para destacar o Link (a página), que o usuario atualmente está
                */}

                {page !== pageNumbers.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page+1)}/>
                    </PaginationItem>
                )}
                {/*
                    Se a página for diferente do tamanho total do nosso array
                    (ou seja, verificamos se ainda não chegamos na uma página)

                    Usamos <PaginationItem /> para indicar um item de paginação
                    Usamos <PaginationNext /> para indicar uma proxima página
                    
                    obs: essa linha <PaginationNext .../> e um botão com texto chamado "Next >" na página, mas a funcionalidade e a mesma

                    onClick={() => onPageChange(page+1)}
                    usamos para o onClick a nossa função que lida com as página

                    então mandamos para a função que quando o usuario clicar nesse
                    componente <PaginationNext /> mandamos a página atual + 1
                    que indica a proxima página

                    então essa função vai setar a página atual como a página atual + 1
                */}
            </PaginationContent>
        </Pagination>
    </div>
  )
}

export default PaginationSelector

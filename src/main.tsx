import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false // indica para o react query que por padrão, ele ira fazer as consultas novamente a qualquer momento em que o usuario clicou fora do navegador e decidiu voltar, o que significa que as consultas não serão refetchadas quando o usuário voltar ao navegador depois de clicar fora
      }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}> {/* criando um ponto de API do usuario */}
        <Auth0ProviderWithNavigate>
          <AppRoutes/>
          <Toaster visibleToasts={1} position="top-right" richColors /> {/* Toaster são as mensagens que vao aparecer quando por exemplo o usuaario atualizar os seus dados, queremos que uma mensagem aparareca pra ele, visibleToasts={1}, significa que apenas uma mensagem será exibida de cada vez, position define aonde a msg ira aparecer, richColors porque vamos ter diferentes tipos de cor de mensagem, por exemplo mensagem de erros e de sucesso  */}
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)

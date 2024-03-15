import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />}/>
            <Route path="/" element={ /* dizemos showHero=true para ele saber que estamos na home page então pode exibir a imagem (hero) */
                <Layout showHero={true} >
                    <HomePage/>
                </Layout>
            } /> 

            <Route element={<ProtectedRoute />}> {/* aqui se o usuario tentar acessar /user-profile primeiro vai ser redirecionado para esse componente (ProtectedRoute) onde verifica se ele estar logado, se essa função der certo ele ira logo em seguida conseguir acessar /user-profile senão será redirecionado para "/" HomePage */}
                <Route
                    path="/user-profile" 
                    element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                }/>

                <Route
                    path="/manage-restaurant" 
                    element={
                    <Layout>
                        <ManageRestaurantPage />
                    </Layout>
                }/>
            </Route>

            <Route path="/auth-callback" element={<AuthCallBackPage />} />
        </Routes>
    )
}


export default AppRoutes;
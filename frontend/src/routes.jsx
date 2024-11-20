import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Feed from "./pages/Feed/Feed";
import PerfilProf from "./pages/EditarPerfilProf/PerfilProf";
import SeusDados from "./pages/SeusDados/SeusDados";
import Assinatura from "./pages/Assinatura/Assinatura";
import Perfil from "./pages/Perfil/Perfil";
import EditarPublicacoes from "./pages/EditarPublicacao/EditarPublicacao";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} index />
      <Route path="/feed" element={<Feed />} />
      <Route path="/perfil-profissional" element={<PerfilProf/>} />
      <Route path="/seus-dados" element={<SeusDados/>} /> 
      <Route path="/planos" element={<Assinatura/>} />
      <Route path="/profile/username/:username" element={<Perfil />} />
      <Route path="/editar-publicacoes" element={<EditarPublicacoes/>
      }/>
      </Routes>
  );
}

export default MainRouter;
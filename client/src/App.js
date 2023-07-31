import {BrowserRouter, Navigate ,Routes,Route, useSearchParams} from "react-router-dom"
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {CssBaseline, createTheme , ThemeProvider} from "@mui/material";


function App() {
  const mode = useSelector((state)=> state.mode )
  const theme = useMemo(()=>createTheme((mode)),[mode]);
  return (
    <div className="App">  
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
     <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/profile/:userId" element={<ProfilePage/>}/>
     </Routes>
     </ThemeProvider>
     </BrowserRouter>
    </div>
 
  );
}

export default App;

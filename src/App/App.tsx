import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import { useAppSelector } from '../store/hooks';
import { selectTheme } from '../reducers/UI/uiSlice';

import Drawer from '../shared/Drawer/Drawer';
import CustomScrollBar from '../shared/CustomScrollBar/CustomScrollBar';
import Footer from '../shared/Footer/Footer';
import Nav from '../shared/Nav/Nav';
import NotFound from '../errors/NotFound';

import Home from '../views/Home/Home';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import SportPage from '../views/SportPage/SportPage';
import FoodPage from '../views/FoodPage/FoodPage';
import DrugPage from '../views/DrugPage/DrugPage';
import SmokePage from '../views/SmokePage/SmokePage';
import SleepPage from '../views/SleepPage/SleepPage';
import HydrationPage from '../views/HydrationPage/HydrationPage';
import AuthPage from '../views/Authentication/AuthenticationPage';
import DashboardPage from '../views/DashboardPage/DashboardPage';
import { selectIsLogged } from '../reducers/user/userSlice';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  const isLogged  = useAppSelector(selectIsLogged)
  const routes = [
    { path: "/profil", component: <ProfilePage /> },
    { path: "/sport", component: <SportPage /> },
    { path: "/alimentation", component: <FoodPage /> },
    { path: "/medicaments", component: <DrugPage /> },
    { path: "/tabagisme", component: <SmokePage /> },
    { path: "/sommeil", component: <SleepPage /> },
    { path: "/hydratation", component: <HydrationPage /> },
    { path: "/dashboard", component: <DashboardPage /> },
  ];
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <CustomScrollBar>
        <Drawer />
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Home />
              </Container>
            }
          />
          <Route
            path="/authentification"
            element={isLogged ? (<Navigate to="/dashboard" />): (<AuthPage />)}
          />
         {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={isLogged ? route.component : <Navigate to="/authentification" />}
            />
          ))}
          <Route
            path="*"
            element={
              <Container>
                <NotFound />
              </Container>
            }
          />
        </Routes>
      </CustomScrollBar>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

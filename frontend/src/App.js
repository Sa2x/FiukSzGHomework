import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import {amber, blueGrey} from "@mui/material/colors";
import UploadPage from "./pages/UploadPage";
import UsersPage from "./pages/UsersPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CommentPage from "./pages/CommentPage";
import UserEditPage from "./pages/UserEditPage";

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: blueGrey
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/upload">
                            <UploadPage />
                        </Route>
                        <Route exact path="/users">
                            <UsersPage />
                        </Route>
                        <Route exact path="/user_edit">
                            <UserEditPage />
                        </Route>
                        <Route exact path="/edit">
                            <EditPage />
                        </Route>
                        <Route exact path="/comment">
                            <CommentPage />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}
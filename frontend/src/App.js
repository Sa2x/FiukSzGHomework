import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import {amber} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: amber
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
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}
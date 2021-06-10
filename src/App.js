import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { routes } from "./routes";
import Home from "./screens/Home";
import Add from "./screens/Add";
import Shop from "./screens/Shop";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/Signup";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isDarkMode = useReactiveVar(darkModeVar);
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Switch>
                            <Route path={routes.home} exact>
                                {isLoggedIn ? <Home /> : <Login />}
                            </Route>
                            <Route path={routes.signup} exact>
                                <SignUp />
                            </Route>
                            <Route path={routes.add} exact>
                                <Add />
                            </Route>
                            <Route path={'/shop/:id'} exact>
                                <Shop />
                            </Route>
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

export default App;

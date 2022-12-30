import { makeStyles } from "@material-ui/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Header from "./components/Header";

const Homepage = lazy(() => import("./pages/Homepage"));
const CoinPage = lazy(() => import("./pages/CoinPage"));

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Suspense fallback={<div>loading...</div>}>
          <Route path="/" component={Homepage} exact />
          <Route path="/koin/:id" component={CoinPage} />
        </Suspense>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;

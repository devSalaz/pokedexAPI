import { LocomotiveScrollProvider } from "react-locomotive-scroll";

//import components
import Homepage from "./pages/Homepage";

//import css
import "./assets/styles/globalStyles.css";

//Import react router
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <main>
        <div className="data-scroll">
          <Navbar />
          <Switch>
            <Route path={["/pokemon/:id", "/"]} exact>
              <Homepage />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;

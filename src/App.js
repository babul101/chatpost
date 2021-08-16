import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import AboutUs from "./components/AboutUs";
import Terms from "./components/Terms";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>
          <HomeGuest />
        </Route>
        <Route path='/about-us'>
          <AboutUs />
        </Route>
        <Route path='/terms'>
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

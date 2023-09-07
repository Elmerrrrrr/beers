import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BeerOverview from "./components/BeerOverview";
import BeerDetail from "./components/BeerDetail";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<BeerOverview />} />
          <Route path="/beer/:id" element={<BeerDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

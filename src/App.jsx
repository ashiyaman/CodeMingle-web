import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/Login";
import Body from "./components/Body";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";

function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={ <Feed /> }></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/test" element={<div>Test page</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;

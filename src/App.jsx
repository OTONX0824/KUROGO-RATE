import { Home } from "./components/Home";
import { Mypage } from "./components/Mypage";
import { Introduce1 } from "./components/Introduce/Introduce1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Stats1 } from "./components/Stats/Stats1";
import { FAQ } from "./components/FAQ";
import { Rate } from "./components/Rate";
import { First } from "./components/First";
import { Message } from "./components/Message";
import { Support } from "./components/Support";
import { Company } from "./components/Company";
import { Policy } from "./components/Policy";
import { Completion } from "./components/Completion";
import { useEffect, useState } from "react";

//Login
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<First />}></Route>

            <Route path="/Rate" element={<Rate />}></Route>
            <Route path="/Home" element={<Home />}></Route>

            <Route path="/Introduce" element={<Introduce1 />}></Route>
            <Route
              path="/Mypage"
              element={
                <PrivateRoute>
                  <Mypage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Stats1"
              element={
                <PrivateRoute>
                  <Stats1 />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/FAQ" element={<FAQ />}></Route>
            <Route path="/Signup" element={<SignUp />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Support" element={<Support />}></Route>
            <Route path="/Company" element={<Company />}></Route>
            <Route path="/Policy" element={<Policy />}></Route>
            <Route path="/Completion" element={<Completion />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
//いらないやつ
/*<Route
              path="/Message"
              element={
                <PrivateRoute>
                  <Message />
                </PrivateRoute>
              }
            ></Route> */

import { auth } from "../firebase";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Head } from "./Head";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const Navigate = useNavigate();
  const { Background } = useContext(Ycontext);
  const [mail1, setmail] = useState();
  const sendEmail = (event) => {
    setmail(event.target.value);
  };
  const [password1, setPassword] = useState();
  const Sendpassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(mail1, password1);
    Navigate("/Home");
  };

  return (
    <NextUIProvider theme={Background}>
      <Head />
      <div style={{ marginTop: "100px", marginLeft: "600px", width: "400px" }}>
        <h1>新規登録</h1>
        <form>
          <div style={{ marginTop: "10px" }}>
            <Input
              onChange={sendEmail}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="メールアドレス"
              placeholder="メールアドレスを入力"
              name="email"
              type="email"
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <Input.Password
              onChange={Sendpassword}
              clearable
              bordered
              fullWidth
              color="error"
              size="lg"
              label="パスワード"
              placeholder="パスワードを入力"
              name="password"
              type="password"
            />
          </div>

          <div>
            <Button
              bordered
              color="success"
              auto
              css={{
                width: "150px",
                height: "50px",
                marginTop: "20px",
                marginLeft: "250px",
              }}
              onClick={handleSubmit}
            >
              登録する
            </Button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: "400px" }}>
        <Footer />
      </div>
    </NextUIProvider>
  );
};

export default SignUp;

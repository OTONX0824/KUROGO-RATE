import { auth } from "../firebase";
import { Link } from "@nextui-org/react";
import { NextUIProvider, Modal } from "@nextui-org/react";
import { Text, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Head } from "./Head";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

const Login = () => {
  const { Background } = useContext(Ycontext);
  //入力されたメールアドレスのステート保持化
  const [mail1, setmail] = useState();
  const sendEmail = (event) => {
    setmail(event.target.value);
  };
  //パスワードのステート保持化
  const [password1, setPassword] = useState();
  const Sendpassword = (event) => {
    setPassword(event.target.value);
  };
  //モーダル表示用ステート
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };

  const navigation = useNavigate();
  //ユーザー情報
  const { user } = useAuthContext();
  //ログイン時挙動
  const handleSubmit = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(mail1, password1)
      .then(() => {
        navigation("/Introduce");
      })
      .catch(() => {
        setVisible(true);
      });
  };

  return (
    <NextUIProvider theme={Background}>
      <Head />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ width: "800px" }}
      >
        <Modal.Header>
          <Text id="modal-title" size={25} color="red">
            !!警告!!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-title" size={20} color="white">
            メールアドレスあるいはパスワードが間違っています。
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto bordered flat color="white" onClick={closeHandler}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ marginTop: "40px", marginLeft: "500px", width: "400px" }}>
        <h1 style={{}}>ログイン</h1>
        <form>
          <div style={{ marginTop: "10px" }}>
            <Input
              onChange={sendEmail}
              clearable
              bordered
              fullWidth
              color="success"
              size="lg"
              label="メールアドレス"
              placeholder="メールアドレスを入力"
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
              type="password"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <h5>
              新規登録は
              <Link href="/Signup">
                <h5 style={{ color: "red" }}>こちら</h5>
              </Link>
              から
            </h5>
          </div>
          <div>
            <Button
              bordered
              color="success"
              auto
              css={{
                width: "150px",
                height: "50px",
                marginTop: "-20px",
                marginLeft: "250px",
              }}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: "460px" }}>
        <Footer />
      </div>
    </NextUIProvider>
  );
};

export default Login;

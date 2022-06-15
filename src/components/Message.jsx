import { Head } from "./Head";
import { NextUIProvider, Link } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

export const Message = () => {
  const { Background } = useContext(Ycontext);
  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />
        <div className="all">
          <div
            style={{
              marginTop: "50px",
              marginLeft: "400px",
              textShadow: "2px 2px 20px",
            }}
          >
            <h1>Message</h1>
          </div>
          <div
            style={{
              marginLeft: "500px",
              textShadow: "2px 2px 20px",
              marginTop: "20px",
            }}
          >
            <h3>22/5/14</h3>
            <Link href="#" icon>
              <h3
                style={{
                  color: "white",
                  borderBottom: "0.5px solid grey",
                  width: "800px",
                }}
              >
                新プロジェクトの締め切りが過ぎました。これより審査を行ってください。
                <br />「<span style={{ color: "red" }}>スーパー超</span>
                」始動！
              </h3>
            </Link>
            <h3>22/4/14</h3>
            <Link href="#" icon>
              <h3
                style={{
                  color: "white",
                  borderBottom: "0.5px solid grey",
                  width: "800px",
                }}
              >
                参加プロジェクトの締め切りが過ぎました。これより審査を行ってください。
                <br />「<span style={{ color: "red" }}>YonJUU</span>
                」始動！
              </h3>
            </Link>
            <h3>22/3/14</h3>
            <Link href="#" icon>
              <h3
                style={{
                  color: "white",
                  borderBottom: "0.5px solid grey",
                  width: "800px",
                }}
              >
                利用規約が改定されました。ご確認のほどよろしくお願いいたします。
                <br />「<span style={{ color: "red" }}>君だよ！</span>
                」始動！
              </h3>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "300px" }}>
          <Footer />
        </div>
      </NextUIProvider>
    </>
  );
};

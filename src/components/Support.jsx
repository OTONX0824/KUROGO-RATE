import { Head } from "./Head";
import { NextUIProvider, Collapse } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

export const Support = () => {
  const { Background } = useContext(Ycontext);
  return (
    <NextUIProvider theme={Background}>
      <div>
        <Head />
        <div
          style={{
            marginTop: "100px",
            marginLeft: "500px",
          }}
        >
          <h1 style={{ width: "700px", borderBottom: "2px solid white" }}>
            お問い合わせ
          </h1>
        </div>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "500px",
          }}
        >
          <h4>
            サービスやシステム，新規プロジェクトについてのお問い合わせはこちら
          </h4>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "500px",
          }}
        >
          <h4 style={{ color: "white" }}>　　　　　infobykurogo@gmail.com</h4>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "500px",
          }}
        >
          <h4 style={{ color: "white" }}>
            *お問い合わせの際は必ず
            <span style={{ color: "red" }}>以下の2点</span>
            を添付して送信してください
          </h4>
          <h5>1. 件名にお問い合わせ内容の概要</h5>
          <h5>2. KUROGOに登録しているメールアドレス</h5>
          <h5>3. 具体的なお問い合わせ内容</h5>
        </div>
        <div
          style={{
            marginTop: "30px",
            marginLeft: "500px",
          }}
        >
          <h3 style={{ color: "red" }}>注意事項</h3>
          <h5>*プロジェクト結果に関するお問い合わせにはお答えできません。</h5>
          <h5>
            *お問い合わせ内容によってはご返信までに数日お時間をいただく場合がございます。
          </h5>
          <h5>
            *お問い合わせには<span style={{ color: "red" }}>日本語</span>
            ，もしくは<span style={{ color: "red" }}>英語</span>
            でのご対応のみとさせていただきます。
          </h5>
        </div>
        <div
          style={{
            marginLeft: "500px",
            width: "700px",
            borderBottom: "2px solid white",
          }}
        ></div>
        <div style={{ marginTop: "250px" }}>
          <Footer />
        </div>
      </div>
    </NextUIProvider>
  );
};

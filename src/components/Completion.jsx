import { Head } from "./Head";
import { NextUIProvider, Button } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

export const Completion = () => {
  const { Background } = useContext(Ycontext);
  const navigation = useNavigate();
  

  const onBacktoHome = () => {
    navigation("/Home");
  };
  const onBacktoMypage = () => {
    navigation("/Mypage");
  };
  return (
    <NextUIProvider theme={Background}>
      <div>
        <Head />
        <div
          style={{
            marginTop: "70px",
            marginLeft: "500px",
          }}
        >
          <h1 style={{ width: "750px", borderBottom: "2px solid white" }}>
            エントリー完了
          </h1>
        </div>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "500px",
          }}
        >
          <h4>
            <span style={{ color: "red" }}>参加者数調整</span>
            のため，調整終了後メールにてエントリー完了メールをお送りいたします。
            <br />
            メールが届き次第，楽曲の評価フェーズに移ってください。
          </h4>
        </div>
        <div
          style={{
            marginTop: "50px",
            marginLeft: "500px",
          }}
        >
          <h4>
            参加プロジェクトについてのお問い合わせはこちらからご連絡ください
          </h4>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "500px",
          }}
        >
          <h4 style={{ color: "white" }}>infobykurogo@gmail.com</h4>
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
            width: "750px",
            borderBottom: "2px solid white",
          }}
        ></div>
        <div
          style={{ marginLeft: "1000px", marginTop: "10PX", display: "flex" }}
        >
          <div>
            <Button
              bordered
              color="grey"
              auto
              css={{
                width: "100px",
                height: "50px",
                marginRight: "10px",
              }}
              onClick={onBacktoHome}
            >
              HOMEへ
            </Button>
          </div>
          <div>
            <Button
              bordered
              color="gradient"
              auto
              css={{
                width: "50px",
                height: "50px",
                marginRight: "30px",
              }}
              onClick={onBacktoMypage}
            >
              マイページへ
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer />
        </div>
      </div>
    </NextUIProvider>
  );
};

import { Head } from "./Head";
import { Text } from "@nextui-org/react";
import { NextUIProvider, Collapse } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

export const FAQ = () => {
  const { Background } = useContext(Ycontext);
  return (
    <NextUIProvider theme={Background}>
      <div>
        <Head />
        <div
          style={{
            marginTop: "10px",
            marginLeft: "400px",
          }}
        >
          <h1>FAQ</h1>
        </div>
        <div style={{ marginTop: "10px", marginLeft: "500px", width: "800px" }}>
          <Collapse title="Q1. プロジェクト参加は有料ですか？">
            <Text
              h1
              size={20}
              css={
                {
                  //textGradient: "45deg, $blue500 -20%, $pink500 50%",
                }
              }
              color="white" //"#ff4ecd"
              weight="bold"
            >
              <span style={{ color: "red" }}>A1.　</span>
              プロジェクト参加には
              <span style={{ color: "red" }}>一切料金はかかりません。</span>
              <br />
              　　もし，プロジェクトを装ったサイトや偽のプロジェクトを発見した場合は
              <br />
              　　運営へご連絡をお願いいたします。
            </Text>
          </Collapse>

          <Collapse title="Q2. アップロードする楽曲URLは何でも良いですか？">
            <Text
              h1
              size={20}
              css={
                {
                  //textGradient: "45deg, $blue500 -20%, $pink500 50%",
                }
              }
              color="white" //"#ff4ecd"
              weight="bold"
            >
              <span style={{ color: "red" }}>A2.　</span>
              アップロードできるのは
              <span style={{ color: "red" }}>YouTubeリンク</span>
              のみとなります。
              <br />
              　　それ以外のリンクやファイルをアップロードすることはできません。
            </Text>
          </Collapse>

          <Collapse title="Q3. 途中でリタイアはできますか？">
            <Text
              h1
              size={20}
              css={
                {
                  //textGradient: "45deg, $blue500 -20%, $pink500 50%",
                }
              }
              color="white" //"#ff4ecd"
              weight="bold"
            >
              <span style={{ color: "red" }}>A3.　</span>
              申し訳ございません。一度プロジェクト参加に参加した場合，
              <br />
              <span style={{ color: "red" }}>
                　　リタイアすることはできません。ご了承ください。
              </span>
            </Text>
          </Collapse>
          <Collapse title="Q4. 結果や副賞はどのように受け取れば良いですか？">
            <Text
              h1
              size={20}
              css={
                {
                  //textGradient: "45deg, $blue500 -20%, $pink500 50%",
                }
              }
              color="white" //"#ff4ecd"
              weight="bold"
            >
              <span style={{ color: "red" }}>A4.　</span>
              <span style={{ color: "red" }}>
                アカウント登録時のメールアドレス
              </span>
              に結果の通知，及び副賞について
              <br />
              　　お送りいたします。
              <br />
              　　メールアドレスが間違っていたり，メールが届いていないという場合は，
              <br />
              　　運営へご連絡をお願いいたします。
            </Text>
          </Collapse>
        </div>
      </div>
      <div style={{ marginTop: "420px" }}>
        <Footer />
      </div>
    </NextUIProvider>
  );
};

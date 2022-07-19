import { Head } from "./Head";
import { Card, Text } from "@nextui-org/react";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";
import { ref, getDownloadURL } from "firebase/storage";

export const First = () => {
  //グローバルステートからのprops引継ぎ
  const { Background, storage } = useContext(Ycontext);
  const [NetWorkImageForLP, setNetWorkImageForLP] = useState();

  useEffect(() => {
    getDownloadURL(
      ref(storage, "gs://kurogo-f196b.appspot.com/LP/Network.png")
    ).then((url) => {
      setNetWorkImageForLP(url);
    });
  }, []);
  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />
        <div className="all" style={{ height: "1600px" }}>
          <div
            style={{ width: "400px", marginLeft: "100px", marginTop: "30px" }}
          >
            <h2
              style={{
                borderBottom: "3px solid white",
                textShadow: "4px 4px 50px",
              }}
            >
              KUROGO-RATEとは？
            </h2>
          </div>
          <div style={{ marginLeft: "150px", marginTop: "-50px" }}>
            <img
              style={{
                width: "1200px",
                height: "auto",
              }}
              src={NetWorkImageForLP}
              alt="images"
            />
          </div>
          <div style={{ marginLeft: "100px", marginTop: "0px" }}>
            <h4>
              KUROGO-RATEは，
              <span style={{ color: "red" }}>参加アーティスト同士の評価</span>
              を基準とした新しい形のコンテストです。
            </h4>
            <h4>
              従来的なコンテストにみられる小人数の審査員による評価 ではなく，
              <span style={{ color: "red" }}>相互的な評価の連鎖</span>
              によってより客観的な評価が行われます。
            </h4>
            <h4>
              それだけでなく，マイページから詳細な評価データを確認することができ，今後の活動に有効なフィードバックを受けることができます。
            </h4>
            <h4>
              メンバー登録，参加等<span style={{ color: "red" }}>全て無料</span>
              で，参加したプロジェクト(コンテスト)で上位に入れば豪華特典が獲得できます。
            </h4>
          </div>
          <div>
            <div
              style={{
                width: "150px",
                marginLeft: "100px",
                marginTop: "100px",
              }}
            >
              <h2
                style={{
                  borderBottom: "3px solid white",
                  textShadow: "4px 4px 50px",
                }}
              >
                使い方
              </h2>
            </div>
            <div>
              <Card
                hoverable
                css={{
                  height: "170px",
                  width: "800px",
                  marginLeft: "200px",
                  marginRight: "100px",
                  marginTop: "50px",
                  boxShadow: "4px 4px 20px",
                  backgroundColor: "rgb(30,30,30)",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  ></div>
                  <div style={{ marginTop: "0px" }}>
                    <div>
                      <Text
                        h1
                        size={25}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "0px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        1.プロジェクトを選択する
                      </Text>
                      <Spacer y={1} />
                    </div>
                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        HOME画面に表示された，開催中のプロジェクトを選択しよう！
                      </Text>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        優勝アーティストには
                        <span style={{ color: "red" }}>豪華特典</span>
                        がついてくるものも！！
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                hoverable
                css={{
                  height: "170px",
                  width: "800px",
                  marginLeft: "600px",
                  marginRight: "100px",
                  marginTop: "50px",
                  boxShadow: "4px 4px 20px",
                  backgroundColor: "rgb(30,30,30)",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  ></div>
                  <div style={{ marginTop: "0px" }}>
                    <div>
                      <Text
                        h1
                        size={25}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "0px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        2.楽曲をアップロードする
                      </Text>
                      <Spacer y={1} />
                    </div>
                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        「参加する」ボタンから，各種要件を確認後，楽曲のYouTubeリンクを
                        <br />
                        アップロードしよう！
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                hoverable
                css={{
                  height: "170px",
                  width: "800px",
                  marginLeft: "200px",
                  marginRight: "100px",
                  marginTop: "50px",
                  boxShadow: "4px 4px 20px",
                  backgroundColor: "rgb(30,30,30)",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  ></div>
                  <div style={{ marginTop: "0px" }}>
                    <div>
                      <Text
                        h1
                        size={25}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "0px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        3.他の参加者の楽曲を評価しよう
                      </Text>
                      <Spacer y={1} />
                    </div>
                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        他のアーティストの楽曲を評価しよう！！
                      </Text>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        「〇〇が良い！」など具体的なコメントがあるとGOOD！
                        <br />
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                hoverable
                css={{
                  height: "170px",
                  width: "800px",
                  marginLeft: "600px",
                  marginRight: "100px",
                  marginTop: "50px",
                  boxShadow: "4px 4px 20px",
                  backgroundColor: "rgb(30,30,30)",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  ></div>
                  <div style={{ marginTop: "0px" }}>
                    <div>
                      <Text
                        h1
                        size={25}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "0px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        4.結果発表
                      </Text>
                      <Spacer y={0.5} />
                    </div>
                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        マイページから，結果を確認しよう！
                      </Text>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        具体的な評価やコメントを見て，今後の制作の参考にしよう！
                        <br />
                        入賞すると，豪華商品がもらえるぞ！
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "400px" }}>
          <Footer />
        </div>
      </NextUIProvider>
    </>
  );
};

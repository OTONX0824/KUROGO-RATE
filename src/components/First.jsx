import { Head } from "./Head";

import { Card, Text } from "@nextui-org/react";
import { NextUIProvider, Collapse, Spacer } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

export const First = () => {
  const { Background } = useContext(Ycontext);
  return (
    <>
      <NextUIProvider theme={Background}>
      <Head />
        <div className="all" style={{ height: "1600px" }}>
          <div
            style={{ width: "400px", marginLeft: "100px", marginTop: "50px" }}
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
          <div style={{ marginLeft: "400px", marginTop: "50px" }}>
            <h3>
              <span style={{ color: "red" }}>参加アーティスト同士の評価</span>
              を基準とした新しい形のコンテスト
            </h3>
            <div>ここに画像</div>
          </div>
          <div>
            <div
              style={{
                width: "150px",
                marginLeft: "100px",
                marginTop: "400px",
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
                        アップロードして，締め切りを待とう！
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
                        締め切り後，他のアーティストの楽曲を評価しよう！！
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
                        「ここが良い！」など具体的なコメントがあるとGOOD！
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
        <Footer />
      </NextUIProvider>
    </>
  );
};

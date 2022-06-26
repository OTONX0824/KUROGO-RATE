import { useContext, useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Text, Loading, Spacer } from "@nextui-org/react";
import { Card, Input, Modal } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Head } from "./Head";
import { Footer } from "./Footer";
import YouTube from "react-youtube";
import ReactStars from "react-stars";
import { Ycontext } from "./context/Ycontext";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useAuthContext } from "./context/AuthContext";

export const Rate = () => {
  //ユーザー情報
  const { user } = useAuthContext();
  //背景色設定
  const { Background } = useContext(Ycontext);
  //データベースの初期設定
  const { db } = useContext(Ycontext);

  //スター値と変換
  const [Star, setStar] = useState(0);
  const onRate = (newRating) => {
    setStar(newRating);
  };
  //自由記述値と変換
  const [InputComment, setComment] = useState("");
  const onInput = (event) => {
    setComment(event.target.value);
  };

  //読み込みグルグルのスイッチ用ステート
  const [onSend, setSend] = useState(false);

  //曲のパス
  const searchRef = collection(db, `project/project1/Songs`);
  //YouTubeのID
  const [YTID, setYouTubeID] = useState();
  //UID
  const [SUID, setSUID] = useState();
  //曲名
  const [SName, setSName] = useState();
  //アーティスト名
  const [AName, setAName] = useState();

  //2分以上聞いていない時のモーダルスイッチ用ステート
  const [visible, setVisible] = useState(false);

  //送信したドキュメント数の把握用ステート
  const [NumOfDocs, setNumOfDocs] = useState();
  const [RemainedQuota, setRemainedQuota] = useState();
  //送り手側のパス
  const sendRef = collection(
    db,
    `/project/project1/JoinUser/${user.uid}/SendRating`
  );

  //あと何評価がノルマであるかを表示
  const GetSendDocs = () => {
    getDocs(sendRef).then((data) => {
      const sendDocs = data.docs.length;
      setNumOfDocs(sendDocs);
      setRemainedQuota(10 - sendDocs);
    });
  };

  //取得した全ドキュメントをステート保持
  const [Docs, setDocs] = useState();
  //firestoreからのドキュメント取得を関数として保持
  const ReloadDocs = () => {
    getDocs(searchRef).then((data) => {
      const docs = data.docs;
      setDocs(docs);
      //ランダマイズ数式→ドキュメント全件取得している
      const randomIndex = Math.floor(Math.random() * docs.length);

      //YouTubeIDの取得
      const randomDocSongID = docs[randomIndex].data().YouTubeID;
      setYouTubeID(randomDocSongID);

      //アーティスト名の取得
      const randomDocArtistName = docs[randomIndex].data().ArtistName;
      setAName(randomDocArtistName);

      //楽曲の取得
      const randomDocSongName = docs[randomIndex].data().SongName;
      setSName(randomDocSongName);

      //UserIDの取得
      const randomDocUID = docs[randomIndex].data().UID;
      setSUID(randomDocUID);

      setSend(false);
      setStar(0.5);
      setComment("");
      GetSendDocs();
    });
  };
  //最初の読み込みだけ作用するように設置
  useEffect(() => {
    GetSendDocs();
    ReloadDocs();
  }, []);

  //再読み込みする必要がないので，最初に読みこんだドキュメントのステートからデータを引き出す
  //評価確定とスキップの時はこの関数を使う
  const Next = () => {
    //ランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * Docs.length);

    //YouTubeIDの取得
    const randomDocSongID = Docs[randomIndex].data().YouTubeID;
    setYouTubeID(randomDocSongID);

    //アーティスト名の取得
    const randomDocArtistName = Docs[randomIndex].data().ArtistName;
    setAName(randomDocArtistName);

    //楽曲の取得
    const randomDocSongName = Docs[randomIndex].data().SongName;
    setSName(randomDocSongName);

    //UserIDの取得
    const randomDocUID = Docs[randomIndex].data().UID;
    setSUID(randomDocUID);

    setStar(0);
    setComment("");
    setSend(false);
    GetSendDocs();
  };

  //firestoreへの値送信

  //時間によって送信制限
  const [newTime, SetTime] = useState();

  //時間を把握
  const Time = (event) => {
    setInterval(() => {
      SetTime(event.target.getCurrentTime());
    }, 1000);
  };

  //値の送信
  const onClickSwitch = () => {
    const LoadingTime = Math.floor(newTime);
    if (LoadingTime < 120) {
      setSend(false);
      setVisible(true);
    } else if (LoadingTime > 120) {
      setSend(true);

      //受け取り側への値送信
      const RecieveDoc = new Promise((resolve) => {
        resolve(
          setDoc(
            doc(
              db,
              `/project/project1/JoinUser/${SUID}/RecieveRating/${user.uid}`
            ),
            {
              Rate: Star,
              Comment: InputComment,
              SendUID: user.uid,
            }
          )
        );
      });

      //送信側への値送信
      const SendDoc = new Promise((resolve) => {
        resolve(
          setDoc(
            doc(
              db,
              `/project/project1/JoinUser/${user.uid}/SendRating/${SUID}`
            ),
            {
              Rate: Star,
              Comment: InputComment,
              RecieveUID: SUID,
            }
          )
        );
      });

      //順番に処理を行って値のみ更新
      Promise.all([RecieveDoc, SendDoc]).then(Next);
    } else {
      setVisible(true);
      setSend(false);
    }
  };

  //モーダルスイッチ
  const closeHandler = () => {
    setVisible(false);
  };

  //YouTubeの画角等調整
  const ops = {
    id: "player",
    width: "300",
    height: "300",
    frameborder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: "true",
    onStateChange: "onStateChange",
    onReady: "onReady",
    getCurrentTime: "getCurrentTime",
  };

  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />

        <div>
          <div
            style={{
              marginRight: "100px",
              marginLeft: "500px",
              marginTop: "50px",
              marginBottom: "100px",
              overflow: "hidden",
            }}
          >
            <YouTube
              videoId={YTID}
              opts={ops}
              onReady={Time}
              onStateChange={Time}
            ></YouTube>
          </div>
          <div>
            <Text
              h3
              size={30}
              css={{
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
                marginLeft: "850px",
                marginRight: "auto",
                marginTop: "-380px",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              参加プロジェクト＜project1＞
            </Text>
            <Text
              h2
              size={40}
              css={{
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
                marginLeft: "850px",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              {AName}
            </Text>
            <Text
              h2
              size={60}
              css={{
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
                marginLeft: "850px",
                marginRight: "auto",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              {SName}
            </Text>
            <div style={{ marginLeft: "1270px", marginTop: "-120px" }}>
              <Button
                bordered
                color="gradient"
                auto
                disabled={true}
                css={{ width: "150px", height: "80px" }}
              >
                評価数:{NumOfDocs}
                {RemainedQuota <= 0 ? (
                  <span></span>
                ) : (
                  <span>ノルマまであと{RemainedQuota}評価</span>
                )}
              </Button>
            </div>

            <div
              style={{
                width: "00px",
                marginLeft: "1360px",
                marginTop: "120px",
              }}
            >
              <Button bordered color="gradient" auto onClick={Next}>
                スキップ ＞＞
              </Button>
            </div>
          </div>
          <div>
            <div>
              <Card
                css={{
                  height: "400px",
                  width: "1000px",
                  marginLeft: "500px",
                  marginRight: "100px",
                  marginTop: "10px",
                  boxShadow: "4px 4px 10px",
                }}
              >
                <div>
                  <Text
                    h1
                    size={25}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginLeft: "100px",
                      marginRight: "10px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    評価(5段階)
                  </Text>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginLeft: "140px" }}>
                    <Text h1 size={20} color="white" weight="bold">
                      悪い
                    </Text>
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <Text h1 size={20} color="white" weight="bold">
                      もう少し
                    </Text>
                  </div>
                  <div style={{ marginLeft: "17px" }}>
                    <Text h1 size={20} color="white" weight="bold">
                      普通
                    </Text>
                  </div>
                  <div style={{ marginLeft: "17px" }}>
                    <Text h1 size={20} color="white" weight="bold">
                      いい感じ
                    </Text>
                  </div>
                  <div style={{ marginLeft: "8px" }}>
                    <Text h1 size={20} color="white" weight="bold">
                      素晴らしい
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "250px",
                    marginTop: "-20px",
                    marginBottom: "5px",
                    textShadow: "4px 4px 12px",
                    height: "100px",
                  }}
                >
                  <ReactStars
                    half={false}
                    aria-label="number"
                    count={5}
                    size={90}
                    value={Star}
                    color2={"#ffd600"}
                    onChange={onRate}
                  ></ReactStars>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Text
                    h1
                    size={25}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginLeft: "100px",
                      marginRight: "10px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    コメント
                  </Text>
                </div>

                <Input
                  aria-label="text"
                  onChange={onInput}
                  value={InputComment}
                  clearable
                  underlined
                  placeholder="ここに入力"
                  css={{
                    height: "150px",
                    width: "700px",
                    marginLeft: "150px",
                    marginRight: "10px",
                    marginTop: "20px",
                  }}
                />
                <div style={{ marginTop: "30px" }}>
                  <Button
                    auto
                    color="gradient"
                    css={{
                      marginLeft: "720px",
                      marginRight: "auto",
                    }}
                    size="xl"
                    onClick={onClickSwitch}
                  >
                    評価確定
                    {onSend ? (
                      <div>
                        <Loading type="spinner" color="white" size="sm" />
                      </div>
                    ) : (
                      <Modal
                        closeButton
                        open={visible}
                        onClose={closeHandler}
                        css={{ width: "800px" }}
                      >
                        <Modal.Header>
                          <Text size={25} color="red">
                            !!警告!!
                          </Text>
                        </Modal.Header>
                        <Modal.Body>
                          <Text size={20} color="white">
                            2分以上試聴してから評価してください
                          </Text>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            auto
                            bordered
                            flat
                            color="white"
                            onClick={closeHandler}
                          >
                            閉じる
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </Button>

                  <Spacer y={0.5} />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer />
        </div>
      </NextUIProvider>
    </>
  );
};

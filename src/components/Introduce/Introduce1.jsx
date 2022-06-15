import { Spacer } from "@nextui-org/react";
import { Input, Link, Modal } from "@nextui-org/react";
import { NextUIProvider, Button, Text, Checkbox } from "@nextui-org/react";
import { Head } from "../Head";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../../firebase";
import { useContext } from "react";
import { Ycontext } from "../context/Ycontext";
import { collection, setDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";

export const Introduce1 = () => {
  //背景等グローバルステート
  const { Background, storage } = useContext(Ycontext);
  //ログイン情報管理
  const { user } = useAuthContext();

  const [Correct, setCor] = useState(false);

  const [visible, setVisible] = useState(false);

  //イントロのイメージをステート管理
  const [IntroImage, setIntroImage] = useState();

  //モーダルのクローズ
  const closeHandler = () => {
    setVisible(false);
    setCor(false);
    setload(true);
  };
  //ナビゲーション
  const navigation = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(mail1, password1);
    if (user) {
      setCor(false);
      navigation("/Introduce");
    } else if (!user) {
      setCor(true);
    }
  };

  const onClickSwitch = () => {
    setVisible(true);
  };
  const [mail1, setmail] = useState();
  const sendEmail = (event) => {
    setmail(event.target.value);
  };
  const [password1, setPassword] = useState();
  const Sendpassword = (event) => {
    setPassword(event.target.value);
  };
  const [inName1, setName1] = useState(false);
  const [Aname, setAname] = useState();
  const onsetName1 = (event) => {
    setName1(true);
    setAname(event.target.value);
  };
  const [inName2, setName2] = useState(false);
  const [SongName, setSongName] = useState();
  const onsetName2 = (event) => {
    setName2(true);
    setSongName(event.target.value);
  };
  const [inName3, setName3] = useState(false);
  const [YoutubeLink, setYoutubeLink] = useState();
  const onsetYouTube = (event) => {
    setName3(true);
    setYoutubeLink(event.target.value.substr(-11));
  };
  const [incheck1, setcheck1] = useState(false);
  const check1 = (event) => {
    setcheck1(true);
  };
  const [incheck2, setcheck2] = useState(false);
  const check2 = (event) => {
    setcheck2(true);
  };
  const [incheck3, setcheck3] = useState(false);
  const check3 = (event) => {
    setcheck3(true);
  };
  const [incheck4, setcheck4] = useState(false);
  const check4 = (event) => {
    setcheck4(true);
  };
  const [load, setload] = useState(true);
  //参加ユーザー数の取得
  const [NumOfUser, setNumOfUser] = useState();
  const { db } = useContext(Ycontext);
  const sendAutoEmail = () => {
    emailjs.init("hZ9xNJbis0mKwGfhp");
    const emailjsServiceId = "KUROGOMAIL";
    const emailjsTemplateId = "KUROGOTEMPLATE";
    //const emailjsPublicKey = "hZ9xNJbis0mKwGfhp";
    const templateParams = {
      toEmail: user.email,
      to_name: Aname,
    };
    emailjs
      .send(
        emailjsServiceId,
        emailjsTemplateId,

        templateParams
      )
      .then(() => {
        console.log("メール送信完了");
        // do something
      });
  };
  const searchRef = collection(db, `project/project1/Songs`);

  const rateRef = doc(db, `/project/project1/JoinUser/${user.uid}`);
  const songRef = doc(db, `/project/project1/Songs/${user.uid}`);
  useEffect(() => {
    getDocs(searchRef).then((data) => {
      const Docs = data.docs.length;
      setNumOfUser(Docs);
      console.log(NumOfUser);
    });
    getDownloadURL(
      ref(
        storage,
        "gs://kurogo-f196b.appspot.com/Projects/project1/intro/intro.png"
      )
    ).then((url) => {
      setIntroImage(url);
    });
  }, []);
  const AllCheck = () => {
    if (
      inName1 &&
      inName2 &&
      inName3 &&
      incheck1 &&
      incheck2 &&
      incheck3 &&
      incheck4 &&
      NumOfUser >= 9
    ) {
      setload(true);
      setDoc(rateRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      setDoc(songRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      navigation("/Rate");
    } else if (
      inName1 &&
      inName2 &&
      inName3 &&
      incheck1 &&
      incheck2 &&
      incheck3 &&
      incheck4 &&
      NumOfUser <= 8
    ) {
      setload(true);
      setDoc(rateRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      setDoc(songRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      //メール送信→データ検索は別途行う
      navigation("/Completion");
    } else {
      setload(false);
    }
  };

  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />
        {user ? (
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            width="430px"
          >
            <Modal.Header>
              <h3>エントリーシート</h3>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginLeft: "20px" }}>
                <div style={{ marginTop: "0px" }}>
                  <div>
                    <h5 style={{ color: "white" }}>
                      1. <span style={{ color: "red" }}>アーティスト名</span>
                      を入力してください
                    </h5>

                    <Input
                      onChange={onsetName1}
                      css={{ marginTop: "15px", width: "300px" }}
                      bordered
                      labelPlaceholder="アーティスト名"
                      color="success"
                    />

                    <h5 style={{ marginTop: "10px", color: "white" }}>
                      2. <span style={{ color: "red" }}>楽曲名</span>
                      を入力してください
                    </h5>
                    <Input
                      onChange={onsetName2}
                      css={{ marginTop: "15px", width: "300px" }}
                      bordered
                      labelPlaceholder="楽曲名"
                      color="success"
                    />
                    <h5 style={{ marginTop: "10px", color: "white" }}>
                      3.楽曲の
                      <span style={{ color: "red" }}>YouTubeリンク</span>
                      を入力してください
                    </h5>
                    <Input
                      onChange={onsetYouTube}
                      css={{ marginTop: "15px", width: "300px" }}
                      bordered
                      type="url"
                      labelPlaceholder="YouTubeリンク"
                      color="success"
                    />
                    <h5 style={{ marginTop: "10px", color: "white" }}>
                      4.以下の事項に同意の上，参加をしてください
                    </h5>
                    <Checkbox
                      onChange={check1}
                      css={{ marginTop: "0px" }}
                      color="gradient"
                      checked={false}
                    >
                      <h6 style={{ color: "white" }}>
                        本プロジェクトに正式に参加するためには，
                        <br />
                        最低で<span style={{ color: "red" }}>10曲</span>
                        を評価することについて了承した
                      </h6>
                    </Checkbox>
                    <Checkbox
                      onChange={check2}
                      css={{ marginTop: "10px" }}
                      color="gradient"
                      checked={false}
                    >
                      <h6 style={{ color: "white" }}>
                        楽曲評価の際，絶対に
                        <span style={{ color: "red" }}>
                          誹謗中傷をしないこと
                        </span>
                        <br />
                        もし誹謗中傷をしたと運営側が判断した場合，
                        <br />
                        法的手続きが取られることについて了承した
                      </h6>
                    </Checkbox>
                    <Checkbox
                      onChange={check3}
                      css={{ marginTop: "10px" }}
                      color="gradient"
                      checked={false}
                    >
                      <h6 style={{ color: "white" }}>
                        一度プロジェクトに参加した場合
                        <br />
                        <span style={{ color: "red" }}>
                          リタイアできないこと
                        </span>
                        について了承した
                      </h6>
                    </Checkbox>
                    <Checkbox
                      onChange={check4}
                      css={{ marginTop: "10px" }}
                      color="gradient"
                      checked={false}
                    >
                      <h6 style={{ color: "white" }}>
                        <Link color="secondary" href="#">
                          利用規約
                        </Link>
                        について了承した
                      </h6>
                    </Checkbox>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {load ? (
                <span></span>
              ) : (
                <span style={{ color: "red" }}>入力欄に誤りがあります</span>
              )}
              <div style={{ display: "flex" }}>
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
                    onClick={closeHandler}
                  >
                    閉じる
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
                      marginRight: "0px",
                    }}
                    onClick={AllCheck}
                  >
                    参加する
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            css={{ width: "800px" }}
          >
            <Modal.Header>
              <Text id="modal-title" size={20} color="white">
                プロジェクト参加には
                <br />
                <span style={{ color: "red" }}>ログイン</span>が必要です
              </Text>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginTop: "10px" }}>
                <Input
                  onChange={sendEmail}
                  clearable
                  bordered
                  fullWidth
                  color="success"
                  size="lg"
                  label="メールアドレス"
                  Placeholder="メールアドレスを入力"
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
                  Placeholder="パスワードを入力"
                  type="password"
                />
              </div>
              <div>
                <h5>
                  新規登録は
                  <Link href="/Signup">
                    <h5 style={{ color: "red" }}>こちら</h5>
                  </Link>
                  から
                </h5>
              </div>
              {Correct ? (
                <span style={{ color: "red" }}>
                  IDまたはパスワードが間違っています
                </span>
              ) : (
                <span></span>
              )}
            </Modal.Body>
            <Modal.Footer>
              <div style={{ display: "flex" }}>
                <div style={{}}>
                  <Button
                    auto
                    bordered
                    flat
                    color="white"
                    onClick={closeHandler}
                    css={{ width: "50px", height: "50px" }}
                  >
                    閉じる
                  </Button>
                </div>
                <div>
                  <Button
                    bordered
                    color="success"
                    auto
                    css={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "20px",
                    }}
                    onClick={handleSubmit}
                  >
                    ログイン
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        )}
        <div className="introduce">
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginLeft: "350px",
                marginTop: "20px",
                width: "800px",
              }}
            >
              <Text
                h1
                size={40}
                css={{
                  marginLeft: "50px",
                }}
                color="white"
                weight="bold"
              >
                TO BE THE STAR プロジェクト
                <br />
                <span style={{ color: "red" }}>豪華特典</span>
                がついてくる！
              </Text>
            </div>
            <div style={{ marginTop: "80px", marginLeft: "80px" }}>
              <Button
                bordered
                color="gradient"
                auto
                css={{ width: "150px", height: "50px" }}
                onClick={onClickSwitch}
              >
                参加する
              </Button>
            </div>
            <div style={{ marginLeft: "-280px", marginTop: "70px" }}>
              <Text
                h1
                size={20}
                css={{
                  marginLeft: "50px",
                }}
                color="white"
                weight="bold"
              >
                参加期間　22/5/5〜<span style={{ color: "red" }}>22/6/5</span>
              </Text>
            </div>
          </div>
          <div
            style={{
              height: "500px",
              width: "1000px",
              marginLeft: "400px",
              marginRight: "100px",
              marginTop: "0px",
            }}
          >
            <img
              style={{
                height: "500px",
                width: "1000px",
              }}
              src={IntroImage}
            />
            <Spacer y={1} />
          </div>

          <div style={{ marginTop: "20px", marginLeft: "1250px" }}>
            <Button
              bordered
              color="gradient"
              auto
              css={{ width: "150px", height: "50px" }}
              onClick={onClickSwitch}
            >
              参加する
            </Button>
          </div>
          <div>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
              }}
              color="white"
              weight="bold"
            >
              TO BE THE STAR プロジェクトがついに始動！
              <br />
              <span style={{ color: "red" }}>豪華特典</span>
              がついてくる！
              <br />
              しかも，5/23までの参加なら特注ステッカーがゲットできる！
            </Text>
          </div>
          <div style={{ marginTop: "40px" }}>
            <Text
              h1
              size={30}
              css={{
                marginLeft: "400px",
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              特典
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              1st　ゴールドカード＆協賛プラグイン
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              2nd　シルバーカード＆協賛プラグイン
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              3rd　ブロンズカード
            </Text>
          </div>
          <div style={{ marginTop: "50px" }}>
            <Text
              h1
              size={30}
              css={{
                marginLeft: "400px",
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              参加資格
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              作詞，作曲，歌唱を一人だけで行っているシンガーソングライター
            </Text>
            <Text
              h1
              size={30}
              css={{
                marginLeft: "400px",
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              参加条件
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              参加している他アーティストの楽曲を
              <span style={{ color: "red" }}>5回以上</span>評価
            </Text>
          </div>
          <div style={{ marginTop: "50px" }}>
            <Text
              h1
              size={30}
              css={{
                marginLeft: "400px",
                textGradient: "45deg, $blue500 -20%, $pink500 50%",
              }}
              color="#ff4ecd"
              weight="bold"
            >
              スケジュール
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              5/5~6/1 　参加＆評価期間
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              6/2~6/4 　集計
            </Text>
            <Text
              h1
              size={20}
              css={{
                marginLeft: "400px",
                marginTop: "20px",
              }}
              color="white"
              weight="bold"
            >
              6/5 　　　結果発表
            </Text>
          </div>
          <div style={{ marginTop: "20px", marginLeft: "400px" }}>
            <Button
              bordered
              color="gradient"
              auto
              css={{ width: "150px", height: "50px" }}
              onClick={onClickSwitch}
            >
              参加する
            </Button>
          </div>
        </div>
      </NextUIProvider>
    </>
  );
};

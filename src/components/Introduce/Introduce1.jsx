import { Spacer } from "@nextui-org/react";
import { Input, Link, Modal } from "@nextui-org/react";
import { NextUIProvider, Button, Text, Checkbox } from "@nextui-org/react";
import { Head } from "../Head";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Footer } from "../Footer";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../../firebase";
import { useContext } from "react";
import { Ycontext } from "../context/Ycontext";
import { collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";

export const Introduce1 = () => {
  //背景等グローバルステート
  const { Background, storage } = useContext(Ycontext);

  //ログイン情報管理
  const { user } = useAuthContext();

  //ID/パスワード用ステート
  const [Correct, setCor] = useState(false);

  //モーダルOpen用ステート
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
  //イントロからのログイン挙動
  const handleSubmit = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(mail1, password1)
      .then(() => {
        setCor(false);
        navigation("/Introduce");
      })
      .catch(() => {
        setCor(true);
      });
  };
  //モーダルの挙動
  const onClickSwitch = () => {
    setVisible(true);
  };
  //ログイン用メールアドレス
  const [mail1, setmail] = useState();
  const sendEmail = (event) => {
    setmail(event.target.value);
  };
  //ログイン用パスワード
  const [password1, setPassword] = useState();
  const Sendpassword = (event) => {
    setPassword(event.target.value);
  };
  //プロジェクト参加の際のアーティスト名が抜けたかどうかの判定用ステート
  const [inName1, setName1] = useState(false);
  //アーティスト名のステート
  const [Aname, setAname] = useState();
  const onsetName1 = (event) => {
    setName1(true);
    setAname(event.target.value);
  };
  //プロジェクト参加時の楽曲名が抜けたかどうかの判定用ステート
  const [inName2, setName2] = useState(false);
  //楽曲名のステート
  const [SongName, setSongName] = useState();
  const onsetName2 = (event) => {
    setName2(true);
    setSongName(event.target.value);
  };
  //プロジェクト参加時のYouTubeのリンクが抜けたかどうかの判定用ステート
  const [inName3, setName3] = useState(false);
  //YouTubeのリンクのステート
  const [YoutubeLink, setYoutubeLink] = useState();
  const onsetYouTube = (event) => {
    setName3(true);
    setYoutubeLink(event.target.value.substr(-11));
  };
  //チェックボックス用ステート
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

  //入力に誤りがあるかどうかの判定用ステート
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
  //プロジェクトのディスクリプション用のパス
  const projectRef = doc(db, `project/project1`);
  //タイトルのステート
  const [Title1, setTitle1] = useState();
  const [Title2, setTitle2] = useState();
  //ディスクリプションのステート
  const [Description11, setDescription11] = useState();
  const [Description22, setDescription22] = useState();
  //賞品説明のステート
  const [Prize1, setPrize1] = useState();
  const [Prize2, setPrize2] = useState();
  const [Prize3, setPrize3] = useState();
  //参加資格ステート
  const [EntryQualification, setEntryQualification] = useState();
  //参加条件ステート
  const [EntryTerms, setEntryTerms] = useState();
  //デッドラインステート
  const [Deadline, setDeadline] = useState();

  //楽曲数確認のためのパス
  const searchRef = collection(db, `project/project1/Songs`);
  //楽曲を読み込み時に把握し，イントロの画像やタイトル等を反映させる
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
    getDoc(projectRef).then((docSnap) => {
      const Title11 = docSnap.data().FirstTitle;
      setTitle1(Title11);
      const Title22 = docSnap.data().SecondTitle;
      setTitle2(Title22);
      const Description111 = docSnap.data().Description1;
      setDescription11(Description111);
      const Description222 = docSnap.data().Description2;
      setDescription22(Description222);
      const Prize11 = docSnap.data().Prize1st;
      setPrize1(Prize11);
      const Prize22 = docSnap.data().Prize2nd;
      setPrize2(Prize22);
      const Prize33 = docSnap.data().Prize3rd;
      setPrize3(Prize33);
      const EntryQualification11 = docSnap.data().EntryQualification;
      setEntryQualification(EntryQualification11);
      const EntryTerms11 = docSnap.data().EntryTerms;
      setEntryTerms(EntryTerms11);
      const Deadline1 = docSnap.data().DeadLine;
      setDeadline(Deadline1);
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
      //プロジェクトのユーザーのパス
      const rateRef = doc(db, `/project/project1/JoinUser/${user.uid}`);
      setDoc(rateRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      //プロジェクトのSongsにいれるためのパス
      const songRef = doc(db, `/project/project1/Songs/${user.uid}`);
      setDoc(songRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      sendAutoEmail();
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
      //プロジェクトのユーザーのパス
      const rateRef = doc(db, `/project/project1/JoinUser/${user.uid}`);
      setDoc(rateRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      //プロジェクトのSongsにいれるためのパス
      const songRef = doc(db, `/project/project1/Songs/${user.uid}`);
      setDoc(songRef, {
        UID: user.uid,
        ArtistName: Aname,
        SongName: SongName,
        YouTubeID: YoutubeLink,
      });
      //データ更新後，10人以上集まればメール送信→データ検索は別途行う
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
                size={50}
                css={{
                  marginLeft: "50px",
                  textGradient: "45deg, $blue500 -20%, $pink500 50%",
                }}
                color="#ff4ecd"
                weight="bold"
              >
                {Title1}
              </Text>
              <Text
                h2
                size={30}
                css={{
                  marginLeft: "50px",
                  marginTop: "0px",
                }}
                color="white"
                weight="bold"
              >
                {Title2}
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
                  marginLeft: "10px",
                }}
                color="white"
                weight="bold"
              >
                参加期間　{Deadline}
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
              {Description11}
              <br />
              {Description22}
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
              1st　{Prize1}
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
              2nd　{Prize2}
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
              3rd　{Prize3}
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
              {EntryQualification}
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
              {EntryTerms}
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
              スケジュール/締め切り
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
              {Deadline} 　参加＆評価期間
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
        <div style={{ marginTop: "200px" }}>
          <Footer />
        </div>
      </NextUIProvider>
    </>
  );
};

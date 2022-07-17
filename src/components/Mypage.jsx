import { Head } from "./Head";
import { NextUIProvider } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Card, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Button, Input, Modal } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";
import { setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc } from "firebase/firestore";
import { useAuthContext } from "./context/AuthContext";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getAuth, updateEmail } from "firebase/auth";
import emailjs from "@emailjs/browser";

export const Mypage = () => {
  const authuser = getAuth();
  const { user } = useAuthContext();
  const { Background, db, storage } = useContext(Ycontext);
  const Navigate = useNavigate();

  //期限が過ぎたかどうかをステートとして保持
  const [Deadline, setdeadline] = useState(false);

  //モーダル用ステート
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  //メール自動送信用関数
  const EmailSend = () => {
    emailjs.init("hZ9xNJbis0mKwGfhp");
    const emailjsServiceId = "KUROGOMAIL";
    const emailjsTemplateId = "changeEmail";

    const templateParams = {
      toEmail: UserMail,
      to_name: InUserName,
    };
    emailjs
      .send(emailjsServiceId, emailjsTemplateId, templateParams)
      .then(() => {
        console.log("メール送信完了");
        // do something
      });
  };

  //firebaseのuserのパス
  const userRef = doc(db, `/user/${user.uid}`);

  //ユーザーネームの設定用ステート
  const [InUserName, setInUserName] = useState();

  const [UserName, setUName] = useState();

  const SetUserName = (event) => {
    setUName(event.target.value);
  };

  //入力されたメールのステート管理
  const [UserMail, setUMail] = useState();
  //入力時のステート入力
  const ChangeUserMail = (event) => {
    setUMail(event.target.value);
  };
  //入力用画像ステート
  const [UserImage, setUI] = useState();

  //モーダル表示用画像ステート
  const [ForModalDisplay, setForModalDisplay] = useState();

  //アーティスト写真のステート
  const [DisplayImage, setDisplayImage] = useState();
  //プロジェクトの小出しイメージのステート管理
  const [ProjectImage1, setProjectImage1] = useState();
  //ユーザー画像ステート変更と，モーダル表示用画像の変更
  const ChangeUserImage = (event) => {
    const fileData = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.addEventListener("load", (e) => {
      const loadedFile = e.target.result;
      setForModalDisplay(loadedFile);
    });
    setUI(event.target.files[0]);
  };
  //アーティスト画像参照
  const ArtistImageRef = ref(storage, `ArtistImage/${user.uid}`);
  const ChangeInfo = () => {
    //メールアドレスが入力されていた場合にfirebaseごとアップデートする
    if (UserMail) {
      updateEmail(authuser.currentUser, `${UserMail}`).then(EmailSend);
    } else {
      console.log("メールアドレス値が空白です");
    }
    //ユーザーネームが変更されていた場合にfirebaseごとアップデートする
    if (UserName) {
      setDoc(userRef, {
        ArtistName: UserName,
        UID: user.uid,
      });
    } else {
      console.log("ユーザー名未記入");
    }
    //ユーザーのイメージを変更する
    if (UserImage) {
      uploadBytes(ArtistImageRef, UserImage).then(() => {
        console.log("アップロード完了");
      });
    } else {
      console.log("インプット値が空白です");
    }

    Navigate("/Home");
  };
  useEffect(() => {
    //アーティストイメージのダウンロードと表示
    getDownloadURL(
      ref(storage, `gs://kurogo-f196b.appspot.com/ArtistImage/${user.uid}`)
    )
      .then((url) => {
        setDisplayImage(url);
        setForModalDisplay(url);
      })
      .catch((error) => {
        getDownloadURL(
          ref(
            storage,
            "gs://kurogo-f196b.appspot.com/ArtistImage/unknown/unknown.png"
          )
        ).then((url) => {
          setDisplayImage(url);
          setForModalDisplay(url);
        });
      });
    //ユーザーネーム
    getDoc(doc(db, `/user/${user.uid}`)).then((docSnap) => {
      if (docSnap.exists()) {
        const Aname = docSnap.data().ArtistName;
        setInUserName(Aname);
      } else {
        console.log("No such document!");
        setInUserName("未設定");
      }
    }, []);

    //一時的にダウンロードする形を取っているが，複数のプロジェクトの際にどのような挙動をさせるか
    getDownloadURL(
      ref(
        storage,
        "gs://kurogo-f196b.appspot.com/Projects/project1/short/sample1.jpg"
      )
    ).then((url) => {
      setProjectImage1(url);
    });
  }, []);

  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />
        <Modal
          closeButton
          aria-label="text"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text size={18}>プロフィール編集</Text>
          </Modal.Header>
          <Modal.Body>
            <img
              src={ForModalDisplay}
              style={{
                width: "150px",
                height: "150px",
                marginLeft: "100px",
                borderRadius: "200px",
              }}
            />
            <input
              onChange={ChangeUserImage}
              style={{ marginLeft: "110px" }}
              type="file"
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="アーティスト名を入力"
              onChange={SetUserName}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="メールアドレスを入力"
              onChange={ChangeUserMail}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto bordered flat color="white" onClick={closeHandler}>
              閉じる
            </Button>
            <Button bordered auto onClick={ChangeInfo}>
              保存
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="all" style={{ marginLeft: "30px" }}>
          <div className="blocks" style={{ display: "flex" }}>
            <div>
              <div
                className="mypages"
                style={{
                  height: "1000px",
                  width: "300px",
                  marginTop: "30px",
                  marginLeft: "10px",
                }}
              >
                <img
                  src={DisplayImage}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginLeft: "30px",
                    borderRadius: "500px",
                  }}
                />
                <div
                  style={{
                    width: "500px",
                    marginLeft: "10px",
                    textShadow: "2px 2px 20px",
                  }}
                >
                  <Text
                    h2
                    size={30}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginLeft: "20px",
                      width: "500px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    アーティスト名
                  </Text>
                  <Text
                    h2
                    size={25}
                    css={{
                      marginLeft: "20px",
                      width: "500px",
                    }}
                    color="white"
                    weight="bold"
                  >
                    {InUserName}
                  </Text>
                  <Spacer y={1} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Text
                    h2
                    size={30}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginLeft: "20px",
                      width: "500px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    メールアドレス
                  </Text>
                  <h3 style={{ marginLeft: "20px" }}>{user.email}</h3>
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <Button bordered color="gradient" auto onClick={handler}>
                    編集
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "00px", marginTop: "20px" }}>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "45deg, $blue500 -20%, $pink500 50%",
                  marginLeft: "100px",
                }}
                color="#ff4ecd"
                weight="bold"
              >
                参加プロジェクト
              </Text>
              <Spacer y={1} />
              <Card
                css={{
                  height: "220px",
                  width: "950px",
                  marginLeft: "100px",
                  boxShadow: "4px 4px 20px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        marginTop: "-20px",
                      }}
                    >
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={ProjectImage1}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "0px" }}>
                    <div>
                      <Text
                        h1
                        size={30}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "50px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        ToBeTheStarプロジェクト
                      </Text>
                      <Spacer y={1} />
                    </div>
                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "50px",
                          width: "700px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        歌い手+ボカロPコラボ企画始動！作曲家/歌手に分かれて一曲制作しよう！
                      </Text>

                      <Spacer y={3} />
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "150px",
                      marginLeft: "-300px",
                      display: "flex",
                    }}
                  >
                    <div>
                      {Deadline ? (
                        <Button disabled auto>
                          楽曲を評価する
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            Navigate("/Rate");
                          }}
                          bordered
                          color="success"
                          auto
                        >
                          <span style={{ color: "white" }}>楽曲を評価する</span>
                        </Button>
                      )}
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <Button
                        onClick={() => {
                          Navigate("/Stats");
                        }}
                        bordered
                        color="gradient"
                        auto
                      >
                        結果を見る
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              <Spacer y={2} />
            </div>
          </div>
        </div>

        <Footer />
      </NextUIProvider>
    </>
  );
};

import { NextUIProvider } from "@nextui-org/react";
import { SideBar } from "./SideBar";
import { Text } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Button, Spacer } from "@nextui-org/react";
import { Head } from "./Head";
import { useContext, useEffect } from "react";
import { Ycontext } from "./context/Ycontext";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";

export const Home = () => {
  const { Background, storage, db } = useContext(Ycontext);

  //プロジェクトのディスクリプション用のパス
  const projectRef = doc(db, `project/project1`);
  //タイトルのステート
  const [Title1, setTitle1] = useState();

  //ディスクリプションのステート
  const [Description11, setDescription11] = useState();
  const [Description22, setDescription22] = useState();

  //参加資格ステート
  const [EntryQualification, setEntryQualification] = useState();
  //参加条件ステート
  const [EntryTerms, setEntryTerms] = useState();
  //デッドラインステート
  const [Deadline, setDeadline] = useState();

  //useNavigateの設定
  const Navi = useNavigate();

  //Homeの画像をステート管理→firebaseから持ってくる
  const [HomeImage, setHomeImage] = useState();
  //プロジェクトの小出しイメージのステート管理
  const [ProjectImage1, setProjectImage1] = useState();

  useEffect(() => {
    //ホームイメージのダウンロード
    getDownloadURL(
      ref(storage, "gs://kurogo-f196b.appspot.com/Projects/home/Banner.png")
    ).then((url) => {
      setHomeImage(url);
    });
    //小出しイメージのダウンロード
    getDownloadURL(
      ref(
        storage,
        `gs://kurogo-f196b.appspot.com/Projects/project1/short/sample1.jpg`
      )
    ).then((url) => {
      setProjectImage1(url);
    });
    getDoc(projectRef).then((docSnap) => {
      const Title11 = docSnap.data().FirstTitle;
      setTitle1(Title11);
      const Description111 = docSnap.data().Description1;
      setDescription11(Description111);
      const Description222 = docSnap.data().Description2;
      setDescription22(Description222);
      const EntryQualification11 = docSnap.data().EntryQualification;
      setEntryQualification(EntryQualification11);
      const EntryTerms11 = docSnap.data().EntryTerms;
      setEntryTerms(EntryTerms11);
      const Deadline1 = docSnap.data().DeadLine;
      setDeadline(Deadline1);
    });
  }, []);
  return (
    <>
      <NextUIProvider theme={Background}>
        <Head />
        <div className="Pageall" style={{ display: "flex" }}>
          <div>
            <SideBar />
          </div>
          <div className="Homeall">
            <div>
              <div
                style={{
                  height: "500px",
                  width: "1000px",
                  marginLeft: "100px",
                  marginRight: "100px",
                  marginTop: "50px",
                }}
              >
                <img
                  style={{
                    height: "500px",
                    width: "1000px",
                  }}
                  src={HomeImage}
                />
                <Spacer y={1} />
              </div>
            </div>
            <Spacer y={1} />
            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "white",
                  marginTop: "20px",
                  marginLeft: "100px",
                }}
              >
                <hr size="5" width="320" color="#FFFFFF" />
              </div>
              <div>
                <h2
                  style={{
                    marginLeft: "00px",
                    weight: "bold",
                    color: "white",
                    textShadow: "2px 2px 20px",
                  }}
                >
                  新規プロジェクト一覧
                </h2>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginLeft: "00px",
                }}
              >
                <hr size="5" width="340" color="#FFFFFF" />
              </div>
            </div>
            <div>
              <Card
                clickable
                hoverable
                css={{
                  height: "250px",
                  width: "1000px",
                  marginLeft: "100px",
                  marginRight: "100px",
                  marginTop: "10px",
                  boxShadow: "4px 4px 20px",
                }}
                onClick={() => {
                  Navi("/Introduce");
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "30px",
                    }}
                  >
                    <div style={{ width: "150px", height: "150px" }}>
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
                        size={25}
                        css={{
                          textGradient: "45deg, $blue500 -20%, $pink500 50%",
                          marginLeft: "50px",
                          width: "500px",
                        }}
                        color="#ff4ecd"
                        weight="bold"
                      >
                        ＜＜{Title1}＞＞
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
                        {Description11}
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
                        {Description22}
                      </Text>
                      <Spacer y={1} />
                    </div>

                    <div>
                      <Text
                        h1
                        size={20}
                        css={{
                          marginLeft: "30px",
                          marginTop: "20px",
                        }}
                        color="white"
                        weight="bold"
                      >
                        参加要件：
                        <span style={{ color: "red" }}>
                          {EntryQualification}
                        </span>
                      </Text>
                    </div>
                  </div>
                  <div style={{ marginTop: "170px", marginLeft: "-100px" }}>
                    <Button
                      bordered
                      color="gradient"
                      auto
                      onClick={() => {
                        Navi("/Introduce");
                      }}
                    >
                      プロジェクト詳細へ
                    </Button>
                  </div>
                </div>
              </Card>
              <Spacer y={2} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "200px" }}>
          <Footer />
        </div>
      </NextUIProvider>
    </>
  );
};

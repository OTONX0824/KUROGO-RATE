import { NextUIProvider } from "@nextui-org/react";
import { Text, Card, Button } from "@nextui-org/react";
import { Head } from "../Head";
import { useContext, useEffect, useState } from "react";
import { Ycontext } from "../context/Ycontext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { doc } from "firebase/firestore";
import { useAuthContext, user } from "../context/AuthContext";
import { auth } from "../../firebase";
import YouTube from "react-youtube";
import { collection, getDoc, getDocs } from "firebase/firestore";

export const Stats1 = () => {
  const { db } = useContext(Ycontext);
  const { Background } = useContext(Ycontext);
  const { user } = useAuthContext();
  //YouTubeのステート
  const [YouTID, setYouTubeID] = useState();
  //アーティスト名のステート
  const [Aname, setAname] = useState();
  //曲名のステート
  const [Sname, setSname] = useState();
  //各コメントのステート
  const [Comment1, setComment1] = useState("");
  const [Comment2, setComment2] = useState("");
  const [Comment3, setComment3] = useState("");
  const [Comment4, setComment4] = useState("");
  const [Comment5, setComment5] = useState("");
  const [Comment6, setComment6] = useState("");
  const [Comment7, setComment7] = useState("");
  const [Comment8, setComment8] = useState("");
  const [Comment9, setComment9] = useState("");
  const [Comment10, setComment10] = useState("");
  //レートのステート
  const [Rate1, setRate1] = useState();
  const [Rate2, setRate2] = useState();
  const [Rate3, setRate3] = useState();
  const [Rate4, setRate4] = useState();
  const [Rate5, setRate5] = useState();

  //YouTubeの参照先
  const YTRef = doc(db, `/project/project1/Songs/${user.uid}`);

  //RecieveRef
  const RecieveRef = collection(
    db,
    `/project/project1/JoinUser/${user.uid}/RecieveRating`
  );
  useEffect(() => {
    getDoc(YTRef).then((docsnap) => {
      const YTID = docsnap.data().YouTubeID;
      setYouTubeID(YTID);
      const getAname = docsnap.data().ArtistName;
      setAname(getAname);
      const getSname = docsnap.data().SongName;
      setSname(getSname);
    });
    getDocs(RecieveRef).then((data) => {
      const docs = data.docs;
      //コメントの数
      const comment1 = docs[0].data().Comment;
      setComment1(comment1);
      const comment2 = docs[1].data().Comment;
      setComment2(comment2);
      const comment3 = docs[2].data().Comment;
      setComment3(comment3);
      const comment4 = docs[3].data().Comment;
      setComment4(comment4);
      const comment5 = docs[4].data().Comment;
      setComment5(comment5);
      const comment6 = docs[5].data().Comment;
      setComment6(comment6);
      const comment7 = docs[6].data().Comment;
      setComment7(comment7);
      const comment8 = docs[7].data().Comment;
      setComment8(comment8);
      const comment9 = docs[8].data().Comment;
      setComment9(comment9);
      const comment10 = docs[9].data().Comment;
      setComment10(comment10);

      //レートの配列入れ込み
      const Rate_1 = docs[0].data().Rate;
      const Rate_2 = docs[1].data().Rate;
      const Rate_3 = docs[2].data().Rate;
      const Rate_4 = docs[3].data().Rate;
      const Rate_5 = docs[4].data().Rate;
      const Rate_6 = docs[5].data().Rate;
      const Rate_7 = docs[6].data().Rate;
      const Rate_8 = docs[7].data().Rate;
      const Rate_9 = docs[8].data().Rate;
      const Rate_10 = docs[9].data().Rate;
      const RateArray = [
        Rate_1,
        Rate_2,
        Rate_3,
        Rate_4,
        Rate_5,
        Rate_6,
        Rate_7,
        Rate_8,
        Rate_9,
        Rate_10,
      ];
      //ユーザーが取得したレートがいくつあるのかを取得し，ステート保持
      const Rate1OfArray = RateArray.filter((value) => value === 1);
      setRate1(Rate1OfArray.length);
      const Rate2OfArray = RateArray.filter((value) => value === 2);
      setRate2(Rate2OfArray.length);
      const Rate3OfArray = RateArray.filter((value) => value === 3);
      setRate3(Rate3OfArray.length);
      const Rate4OfArray = RateArray.filter((value) => value === 4);
      setRate4(Rate4OfArray.length);
      const Rate5OfArray = RateArray.filter((value) => value === 5);
      setRate5(Rate5OfArray.length);
    });
  }, []);
  //円グラフ用関数等
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["1:悪い", "2:改善の余地あり", "3:普通", "4:良い", "5:非常に良い"],
    datasets: [
      {
        label: "得点分布",
        data: [Rate1, Rate2, Rate3, Rate4, Rate5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  //YouTubeのcss
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
        <div className="all" style={{ marginLeft: "250px" }}>
          <div
            style={{
              width: "1200px",
              marginTop: "50px",
              marginLeft: "00px",
              borderBottom: "3px solid white",
            }}
          >
            <h2>審査結果</h2>
          </div>
          <div className="tops" style={{ display: "flex" }}>
            <div
              style={{
                marginRight: "100px",
                marginLeft: "250px",
                marginTop: "50px",
                marginBottom: "100px",
                overflow: "hidden",
              }}
            >
              <YouTube videoId={YouTID} opts={ops}></YouTube>
            </div>
            <div>
              <div>
                <div>
                  <Text
                    h2
                    size={40}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginTop: "30px",
                      marginLeft: "-50px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    {Aname}
                  </Text>
                </div>
                <div>
                  <Text
                    h2
                    size={60}
                    css={{
                      textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      marginLeft: "-50px",
                      marginTop: "0px",
                    }}
                    color="#ff4ecd"
                    weight="bold"
                  >
                    {Sname}
                  </Text>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  bordered
                  color="gradient"
                  auto
                  disabled={true}
                  css={{ width: "300px", height: "150px", marginLeft: "-50px" }}
                >
                  <h2>第１位</h2>
                </Button>
              </div>
            </div>
          </div>
          <div className="blocks">
            <div className="numbers">
              <div
                style={{
                  width: "1200px",
                  marginTop: "-50px",
                  marginLeft: "00px",
                  borderBottom: "3px solid white",
                }}
              >
                <h2>評価分布 </h2>
              </div>
            </div>
            <div
              className="graphs"
              style={{
                marginTop: "40px",
                marginLeft: "200px",
                display: "flex",
              }}
            >
              <div style={{ width: "500px", height: "500px" }}>
                <Doughnut data={data} />
              </div>
              <div
                className="No"
                style={{ marginTop: "-50px", marginLeft: "100px" }}
              >
                <div
                  style={{
                    width: "200px",
                    display: "flex",
                    borderBottom: "1px solid white",
                  }}
                >
                  <div style={{ marginTop: "50px" }}>
                    <h3>スコア</h3>
                  </div>
                  <div style={{}}>
                    <Text
                      h1
                      size={40}
                      css={{
                        marginTop: "40px",
                        marginLeft: "25px",
                        textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      }}
                      color="#ff4ecd"
                      weight="bold"
                    >
                      4.0
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    width: "250px",
                    display: "flex",
                    borderBottom: "1px solid white",
                  }}
                >
                  <div style={{ marginTop: "20px" }}>
                    <h3>平均</h3>
                  </div>
                  <div style={{}}>
                    <Text
                      h1
                      size={40}
                      css={{
                        marginTop: "5px",
                        marginLeft: "50px",
                        textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      }}
                      color="#ff4ecd"
                      weight="bold"
                    >
                      3.0
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    width: "300px",
                    display: "flex",
                    borderBottom: "1px solid white",
                  }}
                >
                  <div style={{ marginTop: "20px" }}>
                    <h3>順位</h3>
                  </div>
                  <div>
                    <Text
                      h1
                      size={40}
                      css={{
                        marginTop: "5px",
                        marginLeft: "50px",
                        textGradient: "45deg, $blue500 -20%, $pink500 50%",
                      }}
                      color="#ff4ecd"
                      weight="bold"
                    >
                      1位 /400
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blocks">
            <div
              style={{
                width: "1200px",
                marginTop: "50px",
                marginLeft: "00px",
                borderBottom: "3px solid white",
              }}
            >
              <h2>コメント評価</h2>
            </div>
            <div
              style={{
                marginTop: "30px",
                marginLeft: "100px",
                display: "flex",
              }}
            >
              <div>
                <h3>コメント1</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment1}</h3>
                </Card>
                <h3>コメント2</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment2}</h3>
                </Card>
                <h3>コメント3</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment3}</h3>
                </Card>
                <h3>コメント4</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment4}</h3>
                </Card>
                <h3>コメント5</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment5}</h3>
                </Card>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <h3>コメント6</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment6}</h3>
                </Card>
                <h3>コメント7</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment7}</h3>
                </Card>
                <h3>コメント8</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment8}</h3>
                </Card>
                <h3>コメント9</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment9}</h3>
                </Card>
                <h3>コメント10</h3>
                <Card
                  bordered
                  shadow={false}
                  css={{ width: "500px", height: "100px" }}
                >
                  <h3>{Comment10}</h3>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </NextUIProvider>
    </>
  );
};

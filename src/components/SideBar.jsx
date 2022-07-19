import { Link } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Ycontext } from "./context/Ycontext";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const { db } = useContext(Ycontext);
  //プロジェクトのドキュメントを一括でステート保持
  const [projectDocs, setProjectDocs] = useState();
  //プロジェクトが入ったかどうかの正誤ステート
  const [isInitProjectData, setisInitProjectData] = useState(false);
  const projectRef = collection(db, `project`);

  const Navi = useNavigate();
  useEffect(() => {
    getDocs(projectRef).then((data) => {
      setProjectDocs(data.docs);
      setisInitProjectData(true);
    });
  });
  const ProjectList = () => {
    let List = [];
    if (isInitProjectData) {
      //プロジェクトが5個以上集まったら，let i=projectDocs.length-5からにする
      for (let i = 0; i < projectDocs.length; i++) {
        const doc = projectDocs[i].data();
        List.push(
          <div
            style={{
              marginLeft: "0px",
              textShadow: "2px 2px 20px",
              width: "300px",
            }}
          >
            <h5>{doc.DeadLine.substr(0, 10)}</h5>
            <Link
              css={{ marginTop: "-20px" }}
              onClick={() => {
                Navi("/Introduce", { state: doc });
              }}
            >
              <h4 style={{ color: "white" }}>新プロジェクト</h4>
            </Link>
            <Link
              css={{ marginTop: "-50px" }}
              onClick={() => {
                Navi("/Introduce", { state: doc });
              }}
              icon
            >
              <h4 style={{ color: "red" }}>
                {doc.FirstTitle}
                <span style={{ color: "white", marginLeft: "10px" }}>
                  始動！
                </span>
              </h4>
            </Link>
          </div>
        );
      }
      return <ul>{List}</ul>;
    }
  };

  return (
    <div>
      <div
        style={{
          height: "1000px",
          width: "300px",
          marginTop: "30px",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            textShadow: "2px 2px 20px",
          }}
        >
          <h1>NEWS</h1>
        </div>
        {ProjectList()}
      </div>
    </div>
  );
};

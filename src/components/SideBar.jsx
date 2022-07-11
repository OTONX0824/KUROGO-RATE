import { Link } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { Ycontext } from "./context/Ycontext";

export const SideBar = () => {
  const { db } = useContext(Ycontext);
  //プロジェクトのドキュメントを一括でステート保持
  const [projectDocs, setProjectDocs] = useState();
  //プロジェクトが入ったかどうかの正誤ステート
  const [isInitProjectData, setisInitProjectData] = useState(false);
  const projectRef = collection(db, `project`);
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
          <div style={{ marginLeft: "20px", textShadow: "2px 2px 20px" }}>
            <h5>{doc.DeadLine.substr(0, 10)}</h5>
            <Link css={{ marginTop: "-20px" }} href="#" icon>
              <h3 style={{ color: "white" }}>
                新プロジェクト
                <h4 style={{ color: "red" }}>{doc.FirstTitle}</h4>始動！
              </h3>
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

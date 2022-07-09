import { Link } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { Ycontext } from "./context/Ycontext";

export const SideBar = () => {
  /*const { db } = useContext(Ycontext);
  const projectRef = doc(db, `project`);

  /*useEffect(() => {
    getDocs(projectRef).then((data) => {});
  }, []);*/
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
        <div style={{ marginLeft: "20px", textShadow: "2px 2px 20px" }}>
          <h5>22/5/14</h5>
          <Link href="#" icon>
            <h3 style={{ color: "white" }}>
              新プロジェクト
              <br />「<span style={{ color: "red" }}>歌モノNo.1選手権</span>
              」<br />
              始動！
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

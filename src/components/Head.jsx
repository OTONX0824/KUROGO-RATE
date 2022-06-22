import * as React from "react";
import { useEffect, useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import Unknown from "../Images/unknown.png";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export const Head = () => {
  const { user } = useAuthContext();
  const { storage } = useContext(Ycontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [DisplayImage, setDisplayImage] = useState();

  const [UnknownImage, setUnknownImage] = useState();

  if (user) {
    getDownloadURL(
      ref(storage, `gs://kurogo-f196b.appspot.com/ArtistImage/${user.uid}`)
    )
      .then((url) => {
        setDisplayImage(url);
      })
      .catch((error) => {
        getDownloadURL(
          ref(
            storage,
            "gs://kurogo-f196b.appspot.com/ArtistImage/unknown/unknown.png"
          )
        ).then((url) => {
          setDisplayImage(url);
        });
      });
  } else {
    getDownloadURL(
      ref(
        storage,
        "gs://kurogo-f196b.appspot.com/ArtistImage/unknown/unknown.png"
      )
    ).then((url) => {
      setUnknownImage(url);
    });
    console.log("ログインしてください");
  }

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const Loginnavi = useNavigate();
  const handleLogin = () => {
    Loginnavi("/Login");
  };
  const Close = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "60px",
          borderBottom: "2px solid white",
        }}
      >
        <div
          style={{
            marginLeft: "50px",
            marginRight: "10px",
            marginTop: "10px",
            height: "50px",
            textShadow: "4px 4px 18px",
            width: "200px",
          }}
        >
          <Link href="/">
            <h3 style={{ color: "white" }}>KUROGO-RATE</h3>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "0px",
            marginRight: "10px",
            marginTop: "10px",
            height: "100px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/Home">
            <h3 style={{ color: "white" }}>HOME</h3>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "50px",
            marginRight: "10px",
            marginTop: "10px",
            height: "100px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/FAQ">
            <h3 style={{ color: "white" }}>FAQ</h3>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            {user ? (
              <img
                src={DisplayImage}
                onClick={() => {
                  setIsOpen(isOpen ? false : true);
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  marginTop: "5px",
                  marginLeft: "1150px",
                  borderRadius: "40px",
                }}
              />
            ) : (
              <img
                src={UnknownImage}
                onClick={() => {
                  setIsOpen(isOpen ? false : true);
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  marginTop: "5px",
                  marginLeft: "1150px",
                  borderRadius: "40px",
                }}
              />
            )}

            {isOpen && (
              <ul
                onBlur={Close}
                tabIndex={1}
                style={{
                  width: "170px",
                  marginTop: "20px",
                  marginLeft: "1050px",
                }}
              >
                <li>
                  <Link href="/Mypage">
                    <h5 style={{ color: "white" }}>マイページ/評価成績</h5>
                  </Link>
                </li>

                <li>
                  {user ? (
                    <Link onClick={handleLogout}>
                      <h5 style={{ color: "red" }}>ログアウト</h5>
                    </Link>
                  ) : (
                    <Link onClick={handleLogin}>
                      <h5 style={{ color: "white" }}>ログイン</h5>
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//いらないやつ
/*<li>
                  <Link href="/Message">
                    <h5 style={{ color: "white" }}>メッセージ</h5>
                  </Link>
                </li> */

import { Head } from "./Head";
import { NextUIProvider, Collapse } from "@nextui-org/react";
import { useContext } from "react";
import { Ycontext } from "./context/Ycontext";
import { Footer } from "./Footer";

export const Company = () => {
  const { Background } = useContext(Ycontext);
  return (
    <NextUIProvider theme={Background}>
      <div>
        <Head />
        <div
          style={{
            marginTop: "100px",
            marginLeft: "500px",
          }}
        >
          <h1 style={{ width: "500px", borderBottom: "2px solid white" }}>
            運営概要
          </h1>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "500px",
            }}
          >
            <h3>運営名</h3>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "100px",
            }}
          >
            <h3 style={{ color: "white" }}>KUROGO</h3>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "500px",
            }}
          >
            <h3>設立</h3>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "120px",
            }}
          >
            <h3 style={{ color: "white" }}>2022年8月24日</h3>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "500px",
            }}
          >
            <h3>代表者</h3>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "100px",
            }}
          >
            <h3 style={{ color: "white" }}>工藤吟</h3>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "500px",
            }}
          >
            <h3>資本金</h3>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "100px",
            }}
          >
            <h3 style={{ color: "white" }}>非公表</h3>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "500px",
            }}
          >
            <h3>事業内容</h3>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "75px",
            }}
          >
            <h3 style={{ color: "white" }}>エンターテック事業</h3>
          </div>
        </div>

        <div
          style={{
            marginLeft: "500px",
            width: "500px",
            borderBottom: "2px solid white",
          }}
        ></div>
        <div style={{ marginTop: "320px" }}>
          <Footer />
        </div>
      </div>
    </NextUIProvider>
  );
};

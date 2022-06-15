import * as React from "react";
import { Link } from "@nextui-org/react";

export const Footer = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "60px",
          borderTop: "2px solid white",
        }}
      >
        <div
          style={{
            marginLeft: "500px",
            marginRight: "10px",
            marginTop: "10px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/Support">
            <h5 style={{ color: "white" }}>お問い合わせ</h5>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "80px",
            marginRight: "10px",
            marginTop: "10px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/Company">
            <h5 style={{ color: "white" }}>運営概要</h5>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "80px",
            marginRight: "10px",
            marginTop: "10px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/Policy">
            <h5 style={{ color: "white" }}>プライバシーポリシー</h5>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "80px",
            marginRight: "10px",
            marginTop: "10px",
            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/FAQ">
            <h5 style={{ color: "white" }}>FAQ</h5>
          </Link>
        </div>
        <div
          style={{
            marginLeft: "80px",
            marginRight: "10px",
            marginTop: "10px",

            textShadow: "4px 4px 18px",
          }}
        >
          <Link href="/Home">
            <h5 style={{ color: "white" }}>HOME</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

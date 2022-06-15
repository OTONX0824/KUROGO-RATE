import { Link } from "@nextui-org/react";

export const SideBar = () => {
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
              <br />「<span style={{ color: "red" }}>スーパー超</span>
              」始動！
            </h3>
          </Link>
          <h5>22/4/14</h5>
          <Link href="#" icon>
            <h3 style={{ color: "white" }}>
              新プロジェクト
              <br />「<span style={{ color: "red" }}>YonJUU</span>
              」始動！
            </h3>
          </Link>
          <h5>22/3/14</h5>
          <Link href="#" icon>
            <h3 style={{ color: "white" }}>
              新プロジェクト
              <br />「<span style={{ color: "red" }}>君だよ！</span>
              」始動！
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

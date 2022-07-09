import { Text } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Button, Spacer } from "@nextui-org/react";

export const SampleCard = (props) => {
  return (
    <Card
      css={{
        height: "250px",
        width: "1000px",
        marginLeft: "100px",
        marginRight: "100px",
        marginTop: "10px",
        boxShadow: "4px 4px 20px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "30px",
          }}
        ></div>
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
              ＜＜{props.title}＞＞
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
              {props.subtitle}
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
              優勝アーティストには
              <span style={{ color: "red" }}>豪華特典</span>
              がついてくる！
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
              <span style={{ color: "red" }}>{props.EntryQualification}</span>
            </Text>
          </div>
        </div>
        <div style={{ marginTop: "150px", marginLeft: "-100px" }}>
          <Button bordered color="gradient" auto onClick={() => {}}>
            プロジェクト詳細へ
          </Button>
        </div>
      </div>
    </Card>
  );
};

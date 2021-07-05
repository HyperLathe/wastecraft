import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Tabletop from "tabletop";
import PageTitle from "../components/PageTitle"
import parse from 'html-react-parser';

const Content = styled.div `

`;

const Paragraph = styled.p `
  font-family: American Typewriter, serif;
    &:empty {
      display: none;
    }
`;

function About() {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Tabletop.init({
      key: "1WprxJa4o3ezvaO2JFIOptZTIKQ5gFER-aE__pkpywoo",
      simpleSheet: true
    })
      .then((data: any) => setData(data))
      .catch((err: any) => console.warn(err));
  }, []);

  return (
    <Content>

      <PageTitle title={"About"} />

      <section>

      {data.map((item, i) => {
            return (
              <Paragraph key={i}>{parse(item.About)}</Paragraph>
            );
          })
      }

      </section>


    </Content>
  );
}

export default About;

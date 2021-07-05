import { useEffect, useState, Fragment } from "react";
import styled from "styled-components/macro";
import Tabletop from "tabletop";
import PageTitle from "../components/PageTitle"
import parse from 'html-react-parser';

const Content = styled.div `
  /* h3 {
    font-family: American Typewriter, serif;
    font-size: 1.1rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
  }
  p {
    font-family: American Typewriter, serif;
    margin-bottom: 20px;
    &:empty {
      display: none;
    }
  } */
`;

function Home() {

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

      <PageTitle title={"WasteCraft"} />

      <section>

      {data.map((item, i) => {
          return (
            <Fragment key={i}>
              {parse(item.Home)}
            </Fragment>
          );
        })
      }

      </section>


    </Content>
  );
}

export default Home;

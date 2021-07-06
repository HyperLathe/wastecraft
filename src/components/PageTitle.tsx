import styled from 'styled-components';

const Title = styled.h2 `
  font-family: American Typewriter, serif;
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 60px 0 20px 0;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.headers};
    @media screen and (min-width: 768px) {
      font-size: 3rem;
      margin: 40px 0;
      font-weight: 400;
    }
`;

interface Props {
  title: string;
}

function PageTitle(props: Props) {
  return (
    <Title>{props.title}</Title>
  );
}

export default PageTitle;
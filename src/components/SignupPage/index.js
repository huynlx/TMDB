import styled from "styled-components";
import ColLeft from "./ColLeft";
import { respondTo } from "../../helpers/_respondTo";
import ColRight from "./ColRight";

const Div = styled.div`
  padding: 20px 31px;
  overflow: hidden;
  @media ${respondTo.md} {
    padding: 0px;
  }
`;
const index = () => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return (
    <Div className="container">
      <div className="row">
        <div className="col-lg-3 col-12">
          <ColLeft theme={theme} />
        </div>
        <div className="col">
          <ColRight theme={theme} />
        </div>
      </div>
    </Div>
  );
};

export default index;

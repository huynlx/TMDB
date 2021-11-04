import styled from "styled-components";
import "../../css/_icon.scss";
import { respondTo } from "../../helpers/_respondTo";
const Div = styled.div(
  ({ theme }) => `
  // border:1px solid rgb(227,227,227);
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  overflow: hidden;
  border-radius: 8px;
  ${theme === "dark" && "background:#313131"};
  @media ${respondTo.md} {
    margin-bottom: 20px;
    box-shadow: none;
    border-radius: 0px;
    border-bottom: 1px solid rgb(227, 227, 227);
  }
  div {
${theme === "dark" ? "background:gray" : "background: #01b4e4"};
    padding: 20px;
    h3 {
      margin: 0;
      font-size: 24px;
      color: white;
      font-weight: 600;
    }
    @media ${respondTo.md} {
      padding: 10px 20px;
      h3 {
        font-size: 20px;
      }
    }
  }
  ul {
    padding: 8px 0px 8px 20px;
    margin: 0px;
    li {
      list-style: none;
      padding: 10px 20px 10px 20px;
      span {
        display: inline-flex;
        width: 19px;
        height: 19px;
        margin-left: -22px;
      }
    }
  }
`
);
const Ul = styled.ul(
  ({ theme }) => `
li{
  span{
    margin-bottom:-3px;
   ${theme === "dark" && "filter:invert(1)"}
  }
}
`
);
const ColLeft = ({ theme }) => {
  return (
    <Div theme={theme}>
      <div>
        <h3>Benefits of being a member</h3>
      </div>
      <hr className="m-0" />
      <Ul theme={theme}>
        <li>
          <span className="check_icon"></span> Find something to watch on your
          subscribed streaming services
        </li>
        <li>
          <span className="check_icon"></span> Log the movies and TV shows you
          have watched
        </li>
        <li>
          <span className="check_icon"></span> Keep track of your favourite
          movies and TV shows and get recommendations from them
        </li>
        <li>
          <span className="check_icon"></span> Build and maintain a personal
          watchlist
        </li>
        <li>
          <span className="check_icon"></span> Build custom mixed lists (movies
          and TV)
        </li>
        <li>
          <span className="check_icon"></span> Take part in movie and TV
          discussions
        </li>
        <li>
          <span className="check_icon"></span> Contribute to, and improve the
          information in our database
        </li>
      </Ul>
    </Div>
  );
};

export default ColLeft;

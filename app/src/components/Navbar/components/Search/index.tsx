import { Tooltip } from "antd";
import "./index.scss";

const Search = () => {
  return (
    <>
      <Tooltip title="Pesquisar" color={"var(--concierge-1)"}>
        <div className="main-search">
          <span className="material-symbols-rounded icon">search</span>
        </div>
      </Tooltip>
    </>
  );
};
export default Search;

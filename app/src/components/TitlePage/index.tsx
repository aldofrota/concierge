import "./index.scss";
import { Breadcrumb } from "antd";

type TitleProps = {
  page: string;
  path: {
    title: string;
  }[];
};

const TitlePage = ({ page, path }: TitleProps) => {
  return (
    <>
      <div className="title-page">
        <h1>{page}</h1>
        <Breadcrumb className="bread" items={path} />
      </div>
    </>
  );
};
export default TitlePage;

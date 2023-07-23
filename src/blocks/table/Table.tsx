import { FC, memo } from "react";
import * as Styled from "./Table.styles";
import Typography from "../../components/Typography/Typography";
import { useNavigate } from "react-router-dom";
type TableProps<T> = {
  data: T[];
};

const Table: FC<TableProps<any>> = ({ data }) => {
  const titles = Object.keys(data[0]);
  const navigate = useNavigate();
  const handleRowClick = (path: string):void  => {
    if(path)
      navigate(path);
  };
  return <TableMarkup titles={titles} data={data} handleRowClick={handleRowClick}/>;
};

const TableMarkup: FC<{ titles: string[]; data: any[]; handleRowClick(path: string):void}> = ({
  titles,
  data,
  handleRowClick
}) => (
  <Styled.Table>
    <thead>
      <tr>
        {titles.map((title, index) => {
          if (title === "id" || title=="path") {
            return null;
          }
          return (
            <th key={title + index}>
              <Typography align="center" variant="paragraphLarge" weight="bold">
                {title}
              </Typography>
            </th>
          );
        })}
      </tr>
    </thead>
    <tbody>
    {data.map((item, index) => (
        <tr key={index} onClick={() => handleRowClick(item.path ?? '#')}>
          {titles.map((title, index) => {
            if (title === "id" || title === "path") {
              return null;
            }
            return (
              <td key={index}>
                <Typography align="center" variant="paragraphMedium">
                  {item[title]}
                </Typography>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </Styled.Table>
);

export default memo(Table);

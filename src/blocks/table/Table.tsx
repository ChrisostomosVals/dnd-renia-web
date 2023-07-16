import { FC } from 'react';
import * as Styled from './Table.styles';
import Typography from '../../components/Typography/Typography';

type TableProps<T> = {
  data: T[];
};

const Table: FC<TableProps<any>> = ({ data }) => {
  const titles = Object.keys(data[0]);

  return <TableMarkup titles={titles} data={data} />;
};

const TableMarkup: FC<{ titles: string[]; data: any[] }> = ({ titles, data }) => (
  <Styled.Table>
    <thead>
      <tr>
        {titles.map((title, index) => {
          if (title === "id") {
            return null;
          }
          return <th key={title + index}><Typography align='center' variant='paragraphLarge' weight='bold'>{title}</Typography></th>;
        })}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={item + index}>
          {titles.map((title, index) => {
            if (title === "id") {
              return null;
            }
            return <td key={index}><Typography align='center' variant='paragraphMedium'>{item[title]}</Typography></td>;
          })}
        </tr>
      ))}
    </tbody>
  </Styled.Table>
);

export default Table;

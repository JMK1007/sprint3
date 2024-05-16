import { IList } from '../../types';
import ActionButton from '../ActionButton/ActionButton';
import List from '../List/List';
import { listContainer } from './ListsContainer.css';

type Props = {
  boardId: string;
  lists: IList[];
};

const ListsCotainer = ({ lists, boardId }: Props) => {
  return (
    <div className={listContainer}>
      {lists.map((list) => {
        return <List key={list.id} list={list} boardId={boardId} />;
      })}
      <ActionButton boardId={boardId} listId='' list />
    </div>
  );
};
export default ListsCotainer;

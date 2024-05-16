import { GrSubtract } from 'react-icons/gr';
import { IList, ITask } from '../../types';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/ActionButton';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';

type Props = {
  list: IList;
  boardId: string;
};

const List = ({ list, boardId }: Props) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        id: v4(),
        message: `리스트 삭제하기:${list.name}`,
        author: 'User',
        timestamp: Date.now().toString(),
      }),
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.name}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleListDelete(list.id)}
        />
      </div>
      {list.tasks.map((task, index) => {
        return (
          <div
            onClick={() => handleTaskChange(boardId, list.id, task)}
            key={task.id}>
            <Task
              name={task.name}
              description={task.description}
              boardId={boardId}
              id={task.id}
              index={index}
            />
          </div>
        );
      })}
      <ActionButton boardId={boardId} listId={list.id} />
    </div>
  );
};
export default List;

import { FiX } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { ChangeEvent, useState } from 'react';
import {
  deleteTask,
  setModalActive,
  updateTask,
} from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);

  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: { ...data.task, name: e.target.value },
    });
  };
  const handleDecriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: { ...data.task, description: e.target.value },
    });
  };

  const handleOwnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: { ...data.task, owner: e.target.value },
    });
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      }),
    );

    dispatch(
      addLog({
        id: v4(),
        message: `일 수정하기: ${editingState.task.name}`,
        author: 'User',
        timestamp: Date.now().toString(),
      }),
    );

    dispatch(setModalActive(false));
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.id,
      }),
    );

    dispatch(
      addLog({
        id: v4(),
        message: `일 삭제하기: ${editingState.task.name}`,
        author: 'User',
        timestamp: Date.now().toString(),
      }),
    );

    dispatch(setModalActive(false));
  };

  return (
    <div>
      <div>
        <div>
          <div>{editingState.task.name}</div>
          <FiX onClick={handleCloseButton} />
        </div>
        <div>제목</div>
        <input
          type='text'
          name=''
          id=''
          value={data.task.name}
          onChange={handleNameChange}
        />
        <div>설명</div>
        <input
          type='text'
          value={data.task.description}
          onChange={handleDecriptionChange}
        />
        <div>생성한 사람</div>
        <input
          type='text'
          value={data.task.owner}
          onChange={handleOwnerChange}
        />
        <div>
          <button onClick={handleUpdate}>일 수정하기</button>
          <button onClick={handleDelete}>일 삭제하기</button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;

import { ChangeEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type Props = {
  boardId: string;
  listId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
};

const DropDownForm = ({ boardId, listId, setIsFormOpen, list }: Props) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState('');
  const formPlaceholder = list
    ? '리스트의 제목을 입력하세요'
    : '일의 제목을 입력하세요';

  const buttonTitle = list ? '리스트 추가하기' : '일 추가하기';

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    if (!text) return;

    if (list) {
      dispatch(
        addList({
          boardId,
          list: {
            id: v4(),
            name: text,
            tasks: [],
          },
        }),
      );

      dispatch(
        addLog({
          id: v4(),
          message: `리스트 생성하기: ${text}`,
          author: 'User',
          timestamp: Date.now().toString(),
        }),
      );

      return;
    }

    dispatch(
      addTask({
        boardId,
        listId,
        task: {
          id: v4(),
          name: text,
          description: '',
          owner: 'User',
        },
      }),
    );

    dispatch(
      addLog({
        id: v4(),
        message: `일 생성하기: ${text}`,
        author: 'User',
        timestamp: Date.now().toString(),
      }),
    );
  };

  return (
    <div>
      <textarea
        value={text}
        autoFocus
        placeholder={formPlaceholder}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
      />
      <div>
        <button onMouseDown={handleButtonClick}>{buttonTitle}</button>
        <FiX />
      </div>
    </div>
  );
};
export default DropDownForm;

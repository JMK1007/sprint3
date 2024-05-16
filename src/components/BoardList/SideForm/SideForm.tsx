import React, { ChangeEvent, useState } from 'react';
import { icon, sideForm } from './SideForm.css';
import { FiCheck } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // inputRef: React.RefObject<HTMLInputElement>;
};

const SideForm = ({ setIsFormOpen: setFormOpen }: Props) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({ board: { id: uuidv4(), name: inputText, lists: [] } }),
      );

      dispatch(
        addLog({
          id: uuidv4(),
          message: `게시판 등록: ${inputText}`,
          author: 'User',
          timestamp: String(Date.now()),
        }),
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        autoFocus
        // ref={inputRef}
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      {/* click 할 때 blur 이벤트가 click 이벤트보다 먼저 발생함
    그래서 onMouseDown으로 수정
    onMouseDown -> onBlur -> onMouseUp ->onClick
    */}
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};
export default SideForm;

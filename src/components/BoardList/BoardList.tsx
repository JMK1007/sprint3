import { useState } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  conatiner,
  title,
} from './BoradList.css';
import clsx from 'clsx';

type Props = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList = ({ activeBoardId, setActiveBoardId }: Props) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    //ref 개념을 위한 방법
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
  };

  return (
    <div className={conatiner}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => {
        return (
          <div
            key={board.id}
            onClick={() => setActiveBoardId(board.id)}
            className={clsx(
              {
                [boardItemActive]:
                  boardArray.findIndex(
                    (board) => board.id === activeBoardId,
                  ) === idx,
              },
              {
                [boardItem]:
                  boardArray.findIndex(
                    (board) => board.id === activeBoardId,
                  ) !== idx,
              },
            )}>
            <div>{board.name}</div>
          </div>
        );
      })}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm
            // inputRef={inputRef}
            setIsFormOpen={setIsFormOpen}
          />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
      </div>
    </div>
  );
};
export default BoardList;

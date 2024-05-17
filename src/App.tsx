import { useState } from 'react';
import { appContainer, board, button, buttons } from './App.css';
import BoardList from './components/BoardList/BoardList';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import ListsCotainer from './components/ListsContainer/ListsCotainer';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const dispatch = useTypedDispatch();
  const modalActive = useTypedSelector((state) => state.boards.modalActive);

  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter(
    (board) => board.id === activeBoardId,
  )[0];

  const lists = getActiveBoard.lists;
  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.id }));
      dispatch(
        addLog({
          id: v4(),
          message: `게시판 지우기 ${getActiveBoard.id}`,
          author: 'User',
          timestamp: Date.now().toString(),
        }),
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.id === activeBoardId,
        );

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };

      setActiveBoardId(boards[newIndexToSet()].id);
    } else {
      alert('최소 게시판 개수는 1개입니다.');
    }
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsCotainer lists={lists} boardId={getActiveBoard.id} />
      </div>
      <div className={buttons}>
        <button className={button} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={button}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보이기'}
        </button>
      </div>
    </div>
  );
}

export default App;

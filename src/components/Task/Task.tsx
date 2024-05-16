import { S } from './Task.css';

type Props = {
  index: number;
  id: string;
  boardId: string;
  name: string;
  description: string;
};

const Task = ({ index, id, boardId, name, description }: Props) => {
  return (
    <div className={S.container}>
      <div className={S.title}>{name}</div>
      <div className={S.description}>{description}</div>
    </div>
  );
};
export default Task;

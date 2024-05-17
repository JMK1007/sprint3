import { BsFillPersonFill } from 'react-icons/bs';
import { ILogItem } from '../../../types';
import { author, date, logItemWrap, message } from './LogItem.css';

type Props = {
  logItem: ILogItem;
};

const LogItem = ({ logItem }: Props) => {
  const timeoffset = new Date(Date.now() - Number(logItem.timestamp));

  const showOffsetTime = `
    ${timeoffset.getMinutes() > 0 ? `${timeoffset.getMinutes()}m` : ''}
    ${timeoffset.getSeconds() > 0 ? `${timeoffset.getSeconds()}s ago` : ''}
    ${timeoffset.getSeconds() === 0 ? `just now` : ''}

  `;

  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.author}
      </div>
      <div className={message}>{logItem.message}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
};
export default LogItem;

export interface ITask {
  id: string;
  name: string;
  description: string;
  owner: string;
}

export interface ILogItem {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}

export interface IBoard {
  id: string;
  name: string;
  lists: IList[];
}

export interface IList {
  id: string;
  name: string;
  tasks: ITask[];
}

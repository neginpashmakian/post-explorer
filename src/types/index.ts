export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Paged<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

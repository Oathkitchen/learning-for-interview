interface User {
  id: number;
  age: number;
  name: string;
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Name = MyPick<User, "name">;

type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>;

type Id = MyOmit<User, 'age' | 'name'>;

type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

type PartialUser = MyPartial<User>

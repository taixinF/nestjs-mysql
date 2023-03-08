//这里可能和dto差不多 可拓展 也可以考虑到其他情况 额外自定义
//这样也是一个很好的做法

export type CreateUserParams = {
  username: string;
  password: string;
};

# 自学 React todolist

## 包含

- 命令式 Toast
- 模态框
- useState useMemo 使用
- 带 filter
- 全局 todo 封装

  todo 数据结构

  ```js
  model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed      Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  }
  ```


Toast 地址

```sh
$ git clone https://github.com/kazawan/react-toast
```

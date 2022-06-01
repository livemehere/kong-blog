import { useEffect, useState } from "react";

export interface ListType {
  file: string;
  thumbnail: string;
}

export default function useMarkdownList() {
  const [list, setList] = useState<ListType[]>([]);
  useEffect(() => {
    const json = require("../markdown/list.json");
    setList(json);
  }, []);
  return { list, setList };
}

import { useEffect, useState } from "react";
import json from "../markdown/list.json";

export interface ListType {
  file: string;
  thumbnail: string;
}

export default function useMarkdownList() {
  const [list, setList] = useState<ListType[]>([]);
  useEffect(() => {
    console.log(json);
    setList(json);
  }, []);
  return { list, setList };
}

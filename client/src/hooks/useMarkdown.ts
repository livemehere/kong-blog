import { useEffect, useState } from "react";

export default function useMarkdown(filename: string) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const mdFile = require(`../markdown/${filename}`);
    fetch(mdFile)
      .then((data) => data.text())
      .then(setMarkdown);
  }, []);

  return { markdown };
}

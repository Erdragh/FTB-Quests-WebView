"use client";
import { FTBQuestChapter } from "@ftbquests-web/quest-parser";
import Quest from "./quest";

import styles from "./chapter.module.scss";
import { useMemo, useState } from "react";

const Chapter: React.FC<FTBQuestChapter> = (props) => {
  const [size, setSize] = useState(1.0);
  const topLeft: [number, number] = useMemo(() => {
    const found: [number, number] = [0, 0];
    for (let placeable of [...props.quests, ...props.images]) {
      found[0] = placeable.x < found[0] ? placeable.x : found[0];
      found[1] = placeable.y < found[1] ? placeable.y : found[1];
    }
    return found;
  }, [props.quests, props.images])
  return (
    <div className={styles.chapter} style={{"--ftb-size": size, "--ftb-top-left-x": topLeft[0], "--ftb-top-left-y": topLeft[1]} as any}>
      {props.quests.map((quest) => (
        <Quest key={quest.id} {...quest} />
      ))}
    </div>
  );
};

export default Chapter;

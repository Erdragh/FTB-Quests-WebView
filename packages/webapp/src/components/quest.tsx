import { FTBQuest } from "@ftbquests-web/quest-parser";

import styles from "./quest.module.scss"

const Quest: React.FC<FTBQuest> = (props) => {
  const shape: string = props.shape || "circle";
  return (
    <div className={styles.quest} style={{ "--ftb-pos-x": props.x, "--ftb-pos-y": props.y, "--ftb-quest-size": props.size ? props.size : 1 } as any}>
      <div className={`${styles.icon} ${styles[shape]}`}></div>
    </div>
  );
};

export default Quest;
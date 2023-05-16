import { FTBQuest } from "@ftbquests-web/quest-parser";

import styles from "./quest.module.scss";

const Quest: React.FC<FTBQuest & { allQuests: FTBQuest[] }> = (props) => {
  const shape: string = props.shape || "circle";
  return (
    <div
      className={`${styles.quest} ${props.hide ? styles.hidden : ""}`}
      style={
        {
          "--ftb-pos-x": props.x,
          "--ftb-pos-y": props.y,
          "--ftb-quest-size": props.size ? props.size : 1,
        } as any
      }
    >
      <button onClick={() => console.log(props)} className={`${styles.icon} ${styles[shape]}`}></button>
      {props.dependencies
        .map((dependency) =>
          props.allQuests.find((quest) => quest.id === dependency)
        )
        .filter((quest) => !!quest)
        .map((quest) => (
          <DependencyLine key={quest?.id} from={props} to={quest as any} />
        ))}
    </div>
  );
};

export default Quest;

const DependencyLine: React.FC<{ from: FTBQuest; to: FTBQuest }> = ({
  from,
  to,
}) => {
  return (
    <div
      className={`${styles.dependencyLine} ${from.hide_dependency_lines ? styles.hidden : ""}`}
      style={{
        "--angle": angle((to.x - from.x), (to.y - from.y)),
        "--pi": Math.PI,
        "--distance": Math.sqrt(Math.pow((to.x - from.x), 2) + Math.pow((to.y - from.y), 2))
      } as any}
    >
    </div>
  );
};

function angle(to_x: number, to_y: number): number {
  const dotProduct = [1, 0].map((from_i, i) => [to_x, to_y][i] * from_i).reduce((a, b) => a + b);
  const angle = Math.acos(dotProduct/(Math.sqrt(to_x * to_x + to_y * to_y)));
  if (to_y < 0) {
    return -angle;
  } else {
    return angle
  }
}
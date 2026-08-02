import { divineNames } from "@/data/names";
import { vocalizedNames } from "@/data/vocalizedNames";
import styles from "./DivineNameText.module.css";

export default function DivineNameText({ name }: { name: string }) {
  const index = divineNames.findIndex((item) => item.name === name);
  return <span className={styles.name} style={{ fontSize: "inherit", marginTop: 0, color: "#e9cb73", WebkitTextFillColor: "#e9cb73" }}>{index >= 0 ? vocalizedNames[index] : name}</span>;
}

import { useDeleteItemsItemId } from "../src/item/item";
import styles from "./page.module.css";

export default function Home() {
  const { mutate } = useDeleteItemsItemId();

  return <div className={styles.page}></div>;
}

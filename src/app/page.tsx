import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/api/auth/signout">signout</Link>
    </div>
  );
}

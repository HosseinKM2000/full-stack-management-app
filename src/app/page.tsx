import styles from "./page.module.css";
import { Button } from "<components>/ui/button"
import { HStack } from "@chakra-ui/react"

export default function Home() {
  return <div className={styles.page}>
        <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  </div>;
}

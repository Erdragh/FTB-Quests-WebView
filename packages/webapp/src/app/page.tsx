import Image from 'next/image'
import styles from './page.module.css'
import snbtToJS from '@ftbquests-web/quest-parser'
import { readFile } from 'fs/promises'
import Quest from '@/components/quest';
import Chapter from '@/components/chapter';

export default async function Home() {
  const chapter = snbtToJS(String(await readFile("../../../Create-Astral/config/ftbquests/quests/chapters/chapter_2.snbt")));
  return (
    <main className={styles.main}>
      <Chapter {...chapter}/>
    </main>
  )
}

import styles from './page.module.css'
import snbtToJS, { FTBQuestChapter } from '@ftbquests-web/quest-parser'
import { readFile } from 'fs/promises'
import Chapter from '@/components/chapter';
import { cache } from 'react';
import {notFound} from "next/navigation";

const read = cache(async (filename: string[]) => {
  console.log("reading", filename);
  return snbtToJS(String(await readFile("../../../Create-Astral/config/ftbquests/quests/chapters/" + filename.join("/"))));
});

export default async function Home({params}: {params: {slug: string[]}}) {
  let chapter: FTBQuestChapter;
  try {
    chapter = await read(params.slug);
  } catch {
    notFound();
  }
  return (
    <main className={styles.main}>
      {chapter && <Chapter {...chapter}/>}
    </main>
  )
}

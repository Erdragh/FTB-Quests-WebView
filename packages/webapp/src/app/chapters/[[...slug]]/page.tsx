import snbtToJS, { FTBQuestChapter } from '@ftbquests-web/quest-parser'
import { readFile } from 'fs/promises'
import Chapter from '@/components/chapter';
import { cache } from 'react';
import { notFound } from "next/navigation";

const read = cache(async (filename: string[]) => {
  console.log("reading", process.env.CHAPTER_BASEDIR, filename);
  if (!process.env.CHAPTER_BASEDIR) {
    console.error("CHAPTER_BASEDIR Environemnt Variable not specified");
    return null;
  }
  return snbtToJS(String(await readFile(process.env.CHAPTER_BASEDIR + filename.join("/"))));
});

export default async function Home({params}: {params: {slug: string[]}}) {
  let chapter: FTBQuestChapter;
  try {
    chapter = await read(params.slug);
  } catch {
    notFound();
  }
  return (
    <main>
      {chapter && <Chapter {...chapter}/>}
    </main>
  )
}

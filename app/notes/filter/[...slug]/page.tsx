import { fetchNotesByTag } from "@/lib/api";
import NotesClient from "./Notes.client";
import NoteList from "@/components/NoteList/NoteList";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  if (slug[0] === "all") {
    return <NotesClient />;
  }
  const tag = slug[0] as NoteTag;
  const response = await fetchNotesByTag(tag);
  console.log(response);

  return <NoteList items={response.notes} />;
};

export default NotesPage;

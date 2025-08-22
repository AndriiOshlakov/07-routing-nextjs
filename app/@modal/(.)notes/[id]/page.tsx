import { fetchNoteById } from "@/lib/api";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css";

import PreviewModal from "@/components/PreviewModal/PreviewModal";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <PreviewModal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note?.createdAt
              ? `Created at: ${note.createdAt} `
              : `Updated at: ${note.updatedAt}`}
          </p>
        </div>
      </div>
    </PreviewModal>
  );
};
export default NotePreview;

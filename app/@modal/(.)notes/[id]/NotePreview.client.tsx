"use client";

import { useParams, useRouter } from "next/navigation";
import css from "@/app/@modal/(.)notes/[id]/PreviewModal.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function PreviewModal() {
  const router = useRouter();
  const close = () => router.back();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (!note || error) {
    return <p>Something went wrong.</p>;
  }
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button onClick={close} className={css.backBtn}>
          Close
        </button>
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
      </div>
    </div>
  );
}

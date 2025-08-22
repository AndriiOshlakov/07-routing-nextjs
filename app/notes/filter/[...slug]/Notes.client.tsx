"use client";
import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";

import NoteForm from "@/components/NoteForm/NoteForm";

function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо сторінку при новому пошуку
  }, 500);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const perPage = 12;

  const { data } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={(selected) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Create note +
        </button>
      </header>

      {data && data?.notes.length >= 1 && <NoteList items={data.notes} />}
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          <NoteForm
            onCancel={() => {
              setIsModalOpen(!isModalOpen);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;

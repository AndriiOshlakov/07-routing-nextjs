"use client";

import { useRouter } from "next/navigation";
import css from "@/app/@modal/(.)notes/[id]/PreviewModal.module.css";

interface ModalProps {
  children: React.ReactNode;
}

export default function PreviewModal({ children }: ModalProps) {
  const router = useRouter();
  const close = () => router.back();
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button onClick={close} className={css.backBtn}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

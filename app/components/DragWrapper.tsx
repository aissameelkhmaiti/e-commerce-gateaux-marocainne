"use client";

import dynamic from "next/dynamic";

const DragAndDropPage = dynamic(
  () => import("./Products"),
  {
    ssr: false,
  }
);

export default function DragWrapper() {
  return <DragAndDropPage />;
}
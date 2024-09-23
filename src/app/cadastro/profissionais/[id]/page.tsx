"use client";

import { Suspense } from "react";
import EditProfissional from "../EditProfissional"

interface EditProfissionaisPageProps { }

const EditProfissionaisPage: React.FC<EditProfissionaisPageProps> = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfissional />
    </Suspense>
  )
}

export default EditProfissionaisPage

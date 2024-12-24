"use client";
import React from "react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { create } from "domain";
import { useRouter } from "next/navigation";
import { createDocument } from "@/actions/actions";
const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docid } = await createDocument();
      router.push(`/document/${docid}`);
    });
  };
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;

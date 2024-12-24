"use client";
import React, { FormEvent, useEffect, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";

const Document = ({ id }: { id: string }) => {
  const [input, setInput] = React.useState("");
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);
  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // update title
      if (input.trim()) {
        await updateDoc(doc(db, "documents", id), { title: input });
      }
    });
  };
  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/* update title */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating}>
            {isUpdating ? "Updating ..." : "Update"}
          </Button>
          {/* IF */}
          {/* isOwnwer && InviteUser, DeleteDocument */}
        </form>
      </div>
      <div>
        {/* Manage users */}
        {/* Avatars */}
      </div>
      {/* collaborative editor */}
    </div>
  );
};

export default Document;

"use client";
import React, { useEffect } from "react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { collectionGroup, query, where } from "firebase/firestore";
import { DocumentData } from "firebase-admin/firestore";
import SideBarOption from "./SideBarOption";
interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}
const SideBar = () => {
  const { user } = useUser();
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );
  const [groupedData, setGroupedData] = React.useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });
  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else {
          acc.editor.push({ id: curr.id, ...roomData });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupedData(grouped);
  }, [data]);
  const menuOptions = (
    <div className="flex flex-col justify-center items-center">
      <NewDocumentButton />
      {/* My Documents */}
      {groupedData.length === 0 ? (
        <h2 className="text-gray-500 text-sm font-semibold text-center mt-2">
          No documents found !
        </h2>
      ) : (
        <>
          <h2 className="text-gray-500 text-sm font-semibold text-center mt-2 mb-2">
            My Documents
          </h2>

          {groupedData.owner.map((doc) => (
            <SideBarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
          ))}
        </>
      )}
      {/* List.... */}
      {/* Shared with me */}
      {groupedData.length === 0 ? ( // groupedData.editor.length === 0
        ""
      ) : (
        <>
          <h2 className="text-gray-500 text-sm font-semibold text-center mt-2 mb-2">
            Shared with me
          </h2>
          {groupedData.editor.map((doc) => (
            <SideBarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
          ))}
        </>
      )}
      {/* List.... */}
    </div>
  );
  return (
    <div className="p-2 md:p-4 bg-gray-200 h-full relative">
      <div className="md:hidden inline">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className=" hover:opacity-30 rounded-lg" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};

export default SideBar;

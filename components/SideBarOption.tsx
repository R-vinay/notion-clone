import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const SideBarOption = ({ href, id }: { href: string; id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";
  return (
    <Link
      href={href}
      className={`m-2 px-2 py-1 border rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black " : " border-gray-400"
      } text-black`}
    >
      <p>{loading ? <Loader /> : data?.title}</p>
    </Link>
  );
};

export default SideBarOption;

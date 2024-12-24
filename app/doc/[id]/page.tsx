"use client";
import React from "react";
import Document from "@/components/Document";
const DocumentPage = (props) => {
  const params = React.use(props.params);
  const { id } = params;
  console.log(id);
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document key={id} id={id} />
    </div>
  );
};

export default DocumentPage;

import { fetchExtraInfo } from "@/lib/actions/extraInfo.actions";
import React from "react";

const ExtraInfo = async () => {
  const extraInfo = await fetchExtraInfo();
  return (
    <div>
      {extraInfo && (
        <h3 className="text-xl mt-11 bg-orange-300">{extraInfo}</h3>
      )}
    </div>
  );
};

export default ExtraInfo;

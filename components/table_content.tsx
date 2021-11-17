import React from "react";

export default function TableContent({ titleList }) {
  return (
    <div
      className="p-2 border border-gray-400 rounded-lg 
      sticky top-10
      "
      // style={{ position: "sticky", top: "20px" }}
    >
      <div className="flex flex-col">
        {Object.keys(titleList).map((elemh2, indexh2) => (
          <>
            {
              <>
                <a
                  key={indexh2}
                  className="my-2"
                  href={`#h2-${indexh2.toString()}`}
                >
                  {elemh2}
                </a>
                {titleList[elemh2].map((elemh3, indexh3) => (
                  <a
                    key={indexh3}
                    className="text-sm"
                    href={`#h2-${indexh2.toString()}-h3-${indexh3.toString()} `}
                  >
                    {elemh3}
                  </a>
                ))}
              </>
            }
          </>
        ))}
      </div>
    </div>
  );
}

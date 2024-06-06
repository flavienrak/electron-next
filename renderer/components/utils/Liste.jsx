import { isEmpty } from "../../lib/allFunctions";

export default function Liste({ label, icon, array, feminin }) {
  return (
    <>
      <div className="w-full gap-2 flex flex-col">
        <h1 className="font-bold flex gap-2 items-center bg-[var(--bg)] px-4 py-2 rounded-sm text-[var(--cont)]">
          <i>{icon}</i>
          {label}
        </h1>
        <ul className="list-disc pl-9">
          {!isEmpty(array) ? (
            <>
              {array?.map((item) => (
                <li
                  key={item}
                  className="first-letter:capitalize text-[var(--cont)]"
                >
                  {item}
                </li>
              ))}
            </>
          ) : (
            <span className="text-[var(--cont)] text-sm">
              {feminin ? `< Aucune >` : `< Aucun >`}
            </span>
          )}
        </ul>
      </div>
    </>
  );
}

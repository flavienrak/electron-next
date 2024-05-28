import { IoIosNotificationsOutline } from "react-icons/io";

export default function Top({ label, notif, letter }) {
  return (
    <>
      <div className="h-16 flex items-center">
        <div className="flex justify-between items-center w-full">
          <label className="uppercase">{label}</label>
          <div className="flex gap-2 items-center">
            <i className="p-1 min-w-10 min-h-10 not-italic bg-slate-200 rounded-full flex justify-center items-center">
              M
            </i>
            <i className="p-1 min-w-10 min-h-10 not-italic bg-slate-200 rounded-full flex justify-center items-center">
              <IoIosNotificationsOutline size={"1.5rem"} />
            </i>
          </div>
        </div>
      </div>
    </>
  );
}

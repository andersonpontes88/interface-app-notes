/* eslint-disable react/prop-types */
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded p-4 bg-slate-50 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-semibold underline text-blue-800">
            {title}
          </h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("ll")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-orange-500"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;

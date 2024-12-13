/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axiosInstance from "./../../utils/axiosInstance";

function AddEditNotes({
  getAllNotes,
  onClose,
  noteData,
  type,
  showToastMessage,
}) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // Adicionar nota
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Nota adicionada com Sucesso!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Editar nota
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Nota atualizada com Sucesso!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Por favor digite um título!");
      return;
    }

    if (!content) {
      setError("Por favor digite um conteúdo!");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="h-8 w-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
      >
        <IoMdCloseCircleOutline className="text-xl text-slate-500 hover:text-red-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TÍTULO</label>
        <input
          type="text"
          className="text-sm sm:text-2xl text-slate-950 outline-none bg-slate-50"
          placeholder="Digite seu título..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 w-52">
        <label className="input-label">CONTEÚDO</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Conteúdo"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 font-medium mt-5 p-3">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-2 sm:p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Atualizar" : "Adicionar"}
      </button>
    </div>
  );
}

export default AddEditNotes;

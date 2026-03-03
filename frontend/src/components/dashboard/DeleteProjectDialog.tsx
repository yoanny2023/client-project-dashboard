interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDialog({open,onClose,onConfirm}: Props) {
  if (!open) return null;

  return (
    <div className="p-3 fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg space-y-4">
        <p>Are you sure you want to delete this project?</p>
        <div className="flex justify-end gap-4">
          <button className="bg-zinc-700 px-4 py-2 rounded-md cursor-pointer" onClick={onClose}>Cancel</button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer transition duration-300"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
}

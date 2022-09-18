import { BiCheck, BiX } from 'react-icons/bi';

type DeleteProps = {
  handleDelete: () => void;
  handleCancel: () => void;
};

export default function Delete({ handleDelete, handleCancel }: DeleteProps) {
  return (
    <div className="flex gap-5">
      <span>Are you sure?</span>
      <button
        type="button"
        onClick={handleDelete}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{' '}
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No{' '}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}

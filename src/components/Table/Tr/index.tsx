import { useAppSelector } from '@/hooks/redux';
import { deleteAction, toggleChangeAction, updateAction } from '@/store/slices/user.slice';
import { Employee } from '@/types';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

export default function Tr({ _id, name, avatar, email, salary, date, status }: Employee) {
  const visible = useAppSelector((state) => state.app.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img src={avatar || '#'} alt="" className="h-8 w-8 rounded-full object-cover" />
        <span className="text-center ml-2 font-semibold">{name || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{salary || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor" type="button">
          <span className={`${status === 'Active' ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
            {status || 'Unknown'}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate} type="button">
          <BiEdit size={25} color="rgb(34,197,94)" />
        </button>
        <button className="cursor" onClick={onDelete} type="button">
          <BiTrashAlt size={25} color="rgb(244,63,94)" />
        </button>
      </td>
    </tr>
  );
}

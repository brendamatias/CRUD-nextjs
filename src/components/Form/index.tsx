import { BiBrush, BiPlus } from 'react-icons/bi';
import { useQueryClient, useMutation } from 'react-query';
import { addUser, getUsers, updateUser, getUser } from '@/lib/helper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import Success from '../Success';
import Error from '../Error';
import Input from '../Input';
import RadioGroup from '../RadioGroup';

type Employee = {
  date: string;
  email: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: 'Active' | 'Inactive';
};

const schema = Yup.object({
  date: Yup.string().required('Date is required'),
  email: Yup.string().required('Email is required'),
  firstname: Yup.string().required('FirstName is required'),
  lastname: Yup.string().required('LastName is required'),
  salary: Yup.string().required('Salary is required'),
  status: Yup.string().required('Status is required').nullable(),
}).required();

export default function Form() {
  const formId = useAppSelector((state) => state.app.formId);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Employee>({
    resolver: yupResolver(schema),
  });

  const createOrUpdateMutation = useMutation((data) => (formId ? updateUser(formId, data) : addUser(data)), {
    onSuccess: () => {
      queryClient.prefetchQuery('users', getUsers);
    },
  });

  const onSubmit = ({ firstname, lastname, email, salary, date, status }: Employee) => {
    const data = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
      email,
      salary,
      date,
      status,
    };

    createOrUpdateMutation.mutate(data);
  };

  const getUserData = async () => {
    const user = await getUser(formId);
    const [firstname, lastname] = user.name.split(' ');

    setValue('firstname', firstname);
    setValue('lastname', lastname);
    setValue('date', user.date);
    setValue('email', user.email);
    setValue('salary', user.salary);
    setValue('date', user.date);
    setValue('status', user.status);
  };

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  useEffect(() => {
    if (formId) getUserData();
  }, [formId]);

  if (createOrUpdateMutation.isSuccess) return <Success message={`${formId ? 'Updated' : 'Added'} Successfully`} />;
  if (createOrUpdateMutation.isLoading) return <div>Loading!</div>;
  if (createOrUpdateMutation.isError) return <Error message={createOrUpdateMutation?.error?.message} />;

  return (
    <div className="container mx-auto py-5">
      <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input name="firstname" placeholder="FirstName" register={register} error={errors?.firstname?.message} />
        <Input name="lastname" placeholder="LastName" register={register} error={errors?.lastname?.message} />
        <Input name="email" placeholder="Email" register={register} error={errors?.email?.message} />
        <Input name="salary" placeholder="Salary" register={register} error={errors?.salary?.message} />
        <Input name="date" type="date" register={register} error={errors?.date?.message} />
        <RadioGroup name="status" register={register} error={errors?.status?.message} options={statusOptions} />

        <button
          type="submit"
          className={`flex justify-center text-md w-2/6  text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 ${
            formId ? 'bg-yellow-400' : 'bg-green-500'
          }`}
        >
          {formId ? 'Update' : 'Add'}{' '}
          <span className="px-1">{formId ? <BiBrush size={24} /> : <BiPlus size={24} />}</span>
        </button>
      </form>
    </div>
  );
}

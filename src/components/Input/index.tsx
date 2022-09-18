import { InputHTMLAttributes } from 'react';

type InputProps = {
  placeholder?: string;
  name: string;
  register: any;
  error?: string;
  type?: 'text' | 'date';
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ name, placeholder, register, error, type = 'text', ...rest }: InputProps) {
  return (
    <div className="input-type">
      <input
        type={type}
        className="border w-full px-5 py-3 focus:outline-none rounded-md"
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />

      <p className="text-red-400 py-2 font-bold">{error}</p>
    </div>
  );
}

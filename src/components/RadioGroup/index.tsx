type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  register: any;
  error?: string;
  options: Option[];
};

export default function RadioGroup({ name, register, error, options }: RadioGroupProps) {
  return (
    <div>
      <div className="flex gap-10 items-center">
        {options.map((option) => (
          <div className="form-check" key={option.value}>
            <input
              id={name}
              type="radio"
              value={option.value}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              {...register(name)}
            />
            <label htmlFor={name} className="inline-block tet-gray-800">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <p className="text-red-400 py-2 font-bold">{error}</p>
    </div>
  );
}

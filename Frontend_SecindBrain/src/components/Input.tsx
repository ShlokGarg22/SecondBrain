import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
}

export const Input = ({ placeholder, reference }: InputProps) => {
  return (
    <input
      ref={reference}
      type="text"
      placeholder={placeholder}
      className="w-full px-5 py-3 text-gray-800 bg-white border-2 border-solid border-black rounded-2xl placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-solid focus:border-black focus:shadow-[4px_4px_0px_black]"
    />
  );
};

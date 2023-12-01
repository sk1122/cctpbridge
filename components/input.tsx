import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full p-3 rounded-xl focus:outline-none ${className}`}
      {...props}
    />
  );
};

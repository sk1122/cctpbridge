import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={
        "w-full p-3 bg-black rounded-xl border-transparent focus:border-transparent focus:ring-0 focus:outline-none " +
        className
      }
      {...props}
    />
  );
};

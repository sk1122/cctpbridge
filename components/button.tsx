import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active: boolean;
  text: string;
}

export const Button: FC<ButtonProps> = ({ active, text, ...props }) => {
  return (
    <button
      className={
        (!active ? "bg-[#1b1b1b] " : "bg-[#FDAE40] text-black ") +
        "w-full h-full flex justify-center items-center p-4 rounded-xl cursor-pointer"
      }
      {...props}
    >
      {text}
    </button>
  );
};

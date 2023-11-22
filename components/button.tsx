import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import Spinner from "./UI/Spinner";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active: boolean;
  isLoading?: boolean;
  text: string;
}

export const Button: FC<ButtonProps> = ({
  active,
  isLoading = false,
  text,
  ...props
}) => {
  return (
    <button
      className={
        (!active
          ? "bg-[#1b1b1b] cursor-not-allowed "
          : "bg-[#FDAE40] text-black cursor-pointer ") +
        "w-full h-full flex justify-center items-center p-4 rounded-xl"
      }
      {...props}
    >
      {isLoading ? <Spinner /> : null}
      {text}
    </button>
  );
};

import pencilIcon from "../../public/pencil.svg";
import trashIcon from "../../public/trash.svg";
import dropdownIcon from "../../public/dropdown.svg";
import todoButton from "../../public/todo_button.png";

export type TImages =
  | "trashIcon"
  | "pencilIcon"
  | "dropdownIcon"
  | "todoButton";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  pencilIcon,trashIcon,dropdownIcon,todoButton
};

import pencilIcon from "../../public/pencil.svg";
import trashIcon from "../../public/trash.svg";

export type TImages =
  | "trashIcon"
  | "pencilIcon";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  pencilIcon,trashIcon
};

import {IconType} from "@icons/enums";

export type IconData = {
    [M in IconType]: {
        viewBox?: string;
        data: string | React.ReactNode;
        style?: React.CSSProperties;
    };
};
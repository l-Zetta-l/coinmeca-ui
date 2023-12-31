import Style from "./TabContent.styled";

export interface TabContent {
    name?: string;
    active?: boolean;
    children?: any;
}

export default function TabContent(props: TabContent) {
    const active = props?.active || false;

    return <Style $active={active}>{props?.children}</Style>;
}

export interface TeamSnapEntryInterface {
    name: string;
    value: string;
}
export interface TeamSnapEntryTypeInterface {
    name: string;
    type: string;
    value: string;
}
export interface TeamSnapEntryArrayTypeInterface {
    name: string;
    type: string[];
    value: string;
}
export interface TeamSnapDeprecatedEntryInterface {
    name: string;
    value: string;
    deprecated: boolean;
    prompt: string;
}
export interface TeamSnapLinkInterface {
    "href": string;
    "rel": string;
}
export interface TeamSnapItemInterface {
    data: (TeamSnapEntryInterface
        | TeamSnapEntryTypeInterface
        | TeamSnapDeprecatedEntryInterface
        | TeamSnapEntryArrayTypeInterface)[];
    href: string;
    links: TeamSnapLinkInterface[]
}

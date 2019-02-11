export class ClientConfig implements ClientConfigBasse {
    constructor(
        public name: string,
        public head: IClientText,
        public subhead: IClientText,
        public link: IClientText,
        public hasImg = false,
        public hasVideo = false,
        public questions: IClientQuestion[]
    ) {
        this.head.style = this.getStyle(this.head.config);
        this.subhead.style = this.getStyle(this.subhead.config);
    }
    private getStyle = (sets: ITextStyle): string => {
        let baseStyle = '';
        if (sets.fontSize)
            baseStyle += `fontsize: ${sets.fontSize}`;
        if (sets.fontName)
            baseStyle += `fontFamily: ${sets.fontName}`;
        return baseStyle;
    }
}
export interface ClientConfigBasse {
    name: string;
    head: IClientText;
    subhead: IClientText;
    link: IClientText;
    hasImg: boolean;
    hasVideo: boolean;
    questions: IClientQuestion[];
}
interface IClientText {
    hasImg?: boolean;
    config: ITextStyle;
    content: string;
    style: string;
}
interface ITextStyle {
    fontName?: string;
    fontSize: number;
}
interface IClientQuestion {
    text: string;
    length: number;
}
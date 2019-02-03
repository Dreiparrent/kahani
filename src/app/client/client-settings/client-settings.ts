export class ClientSettings {
    public hasImg: boolean;
    public hasVideo: boolean;
    public head: {
        hasImg: boolean;
        style: ITextStyle;
        content: string;
    };
    public subHead: {
        style: ITextStyle;
        content: string;
    };
    public linkStule: ITextStyle;
    constructor() {

    }
}
interface ITextStyle {
    fontName?: string;
    fontSize: number;
}
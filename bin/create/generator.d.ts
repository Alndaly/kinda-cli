export declare class Generator {
    name: string;
    targetDir: string;
    type: string;
    structure: string;
    constructor(name: string, type: string, structure: string, targetDir: string);
    wrapLoading(fn: any, message: string, ...args: any): Promise<any>;
    getRepo(filter: string): Promise<any>;
    getTag(repo: string): Promise<any>;
    download(repo: string, tag: string, targetDir: string): Promise<void>;
    create(): Promise<void>;
}

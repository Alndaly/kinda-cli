export declare class Generator {
    name: string;
    targetDir: string;
    type: string;
    constructor(name: string, type: string, targetDir: string);
    create(): Promise<void>;
}

interface CreateOptions {
    type: string;
    force: boolean;
    structure: string;
}
export default function (name: string, options: CreateOptions): Promise<void>;
export {};

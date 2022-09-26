interface CreateOptions {
    type: string;
    force: boolean;
}
export default function (name: string, options: CreateOptions): Promise<void>;
export {};

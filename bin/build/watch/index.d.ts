export declare const getWatchOptions: () => {
    aggregateTimeout: number;
    poll: number;
    ignored: RegExp;
    'info-verbose': string;
    progress: boolean;
};
export declare const watchHandlers: (err: any, stats: any) => void;

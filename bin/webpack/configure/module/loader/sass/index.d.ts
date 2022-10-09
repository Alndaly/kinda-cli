import { Environement } from './../../../../../types/index.js';
export declare const getSassLoader: (environement: Environement) => ({
    loader: string;
    options: {
        sourceMap?: undefined;
        modules?: undefined;
        importLoaders?: undefined;
        postcssOptions?: undefined;
    };
} | {
    loader: string;
    options: {
        sourceMap: boolean;
        modules: {
            localIdentName: string;
        };
        importLoaders: number;
        postcssOptions?: undefined;
    };
} | {
    loader: string;
    options: {
        sourceMap: boolean;
        postcssOptions: {
            plugins: {}[][];
        };
        modules?: undefined;
        importLoaders?: undefined;
    };
})[];

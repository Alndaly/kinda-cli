import { Environement } from './../../../types/index.js';
import type { ModuleOptions } from 'webpack';
import { getBabelLoader } from './loader/babel/index.js'
import { getJsonLoader } from './loader/json/index.js'
import { getSassLoader } from './loader/sass/index.js'

export const getDefaultModuleConfig = (environement: Environement) => {
    const module: ModuleOptions = {
        rules: [
            {
                test: /\.json$/,
                use: getJsonLoader()
            },
            {
                test: /\.s[ac]ss$/i,
                use: getSassLoader(environement)
            },
            {
                test: /\.[jt]sx?$/i,
                // use: path.resolve(__dirname, '../../../../node_modules/ts-loader/dist/index.js'),
                use: getBabelLoader(),
                exclude: /node_modules/,
            },
        ]
    };
    return module;
}
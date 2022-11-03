import type { Configuration } from 'webpack';

export type Environement = 'development' | 'production' | 'test' | 'pre'

export interface BuildOptions {
	watch: boolean;
}

export interface ServerOptions {
	port: number
}

export interface KindaConfiguration {
    structure: 'vite' | 'webpack',
    webpackConfiguration: Configuration
}

export interface CreateOptions {
	type: string,
	force: boolean,
	structure: string
}

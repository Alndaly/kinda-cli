/**
 * 获取模板列表
 * @returns Promise
 */
export declare function getRepoList(): Promise<any>;
/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
export declare function getTagList(repo: string): Promise<any>;

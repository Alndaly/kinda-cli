import { template_offer } from './config.js';
// 通过 axios 处理请求
import axios from 'axios';

axios.interceptors.response.use((res) => {
	return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
export async function getRepoList() {
	if (template_offer.type === 'user') {
		return axios.get(
			`https://api.github.com/users/${template_offer.name}/repos?per_page=200&page=1`
		);
	} else if (template_offer.type === 'organizer') {
		return axios.get(
			`https://api.github.com/orgs/${template_offer.name}/repos?per_page=200&page=1`
		);
	}
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
export async function getTagList(repo) {
	if (template_offer.type === 'user') {
		return axios.get(
			`https://api.github.com/repos/${template_offer.name}/${repo}/tags?per_page=200&page=1`
		);
	} else if (template_offer.type === 'organizer') {
		return axios.get(
			`https://api.github.com/repos/${template_offer.name}/${repo}/tags?per_page=200&page=1`
		);
	}
}

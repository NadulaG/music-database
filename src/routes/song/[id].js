import dotenv from 'dotenv';
dotenv.config();

let token;
import { tokenStore } from '../../stores/tokenStore';
import { getToken } from '../api/[query]';
tokenStore.subscribe((t) => {
	token = t;
});

const QUERY_URL = `https://api.spotify.com/v1/tracks/`;

/** @type {import('./__types/spotify').RequestHandler} */
export const get = async ({ params }) => {
	const res = await fetch(`${QUERY_URL}${params.id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	let data = await res.json();

	if (data.error) {
		await getToken();
		const res = await fetch(`${QUERY_URL}${params.id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		data = await res.json();
	}

	return {
		status: 200,
		body: {
			data
		}
	};
};

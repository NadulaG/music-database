import dotenv from 'dotenv';
dotenv.config();

let token;
import { tokenStore } from '../../stores/tokenStore';
tokenStore.subscribe((t) => {
	token = t;
});

const CLIENT_ID = process.env['CLIENT_ID'];
const CLIENT_SECRET = process.env['CLIENT_SECRET'];
const TOKEN_URL = `https://accounts.spotify.com/api/token`;
const QUERY_URL = `https://api.spotify.com/v1/search`;

/** @type {import('./__types/spotify').RequestHandler} */
export const get = async ({ params }) => {
	const res = await fetch(`${QUERY_URL}?q=${params.query}&type=track`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	let data = await res.json();

	if (data.error) {
		await getToken();
		const res = await fetch(`${QUERY_URL}?q=${params.query}&type=track`, {
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

export const getToken = async () => {
	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
		},
		body: `grant_type=client_credentials`
	});

	const data = await res.json();
	tokenStore.set(data.access_token);
};

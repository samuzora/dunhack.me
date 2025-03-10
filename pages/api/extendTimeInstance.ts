import { unstable_getServerSession } from 'next-auth';
import { userEnabled } from '../../server/userFunctions';
import { authOptions } from './auth/[...nextauth]';

export default async function extendTimeInstance(req, res) {
	if (req.method === 'POST') {
		const session = await unstable_getServerSession(req, res, authOptions);
		if (session) {
			// Signed in
			let userId = session.user.id;

			//Ensure User is Enabled/Valid
			let enabled = await userEnabled(userId);
			if (enabled === false) {
				res.status(401).json({ error: 'User is not enabled' });
				return;
			} else if (enabled === null) {
				res.status(401).json({ error: 'User does not exist' });
				return;
			}

			//call runner
			let response = await fetch(
				`${process.env.RUNNER_SITE}/extendTimeLeft?userid=${userId}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
					},
				}
			);
			
			let json = await response.json();
			if (json.Error) {
				res.status(400).json({ error: json.Error });
			} else if (json.Success) {
				res.status(200).json({ success: true });
			} else {
				res.status(500).json({ success: false });
			}
		} else {
			// Not Signed in
			res.status(401).end('Not signed in');
		}
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

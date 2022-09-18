import { NextApiRequest, NextApiResponse } from 'next';
import UserController from '@/controllers/UserController';
import connectDB from '@/database/connectDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectDB();
  } catch (err) {
    return res.status(405).json({ error: 'Error in the Connection' });
  }

  const { method } = req;

  if (method === 'GET') return UserController.getUser(req, res);
  if (method === 'PUT') return UserController.updateUser(req, res);
  if (method === 'DELETE') return UserController.deleteUser(req, res);

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);

  return res.status(405).end(`Method ${method} Not Allowd`);
}

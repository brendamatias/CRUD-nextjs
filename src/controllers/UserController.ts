import { NextApiRequest, NextApiResponse } from 'next';
import Users from '@/model/user';

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: 'User not Selected...!' });
  } catch (error) {
    return res.status(404).json({ error: 'Cannot get the User...!' });
  }
}

async function listUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: 'Data not Found' });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: 'Error While Fetching Data' });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: 'Form Data Not Provided...!' });
    const user = await Users.create(formData);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: 'User Not Selected...!' });
  } catch (error) {
    return res.status(404).json({ error: 'Error While Updating the Data...!' });
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: 'User Not Selected...!' });
  } catch (error) {
    return res.status(404).json({ error: 'Error While Deleting the User...!' });
  }
}

const UserController = {
  getUser,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default UserController;

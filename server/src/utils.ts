import { Item } from './models/items';
import { User } from './models/users';

export const setUpMockData = async (): Promise<void> => {
  try {
    const data = await Item.findOne({}).exec();
    if (!data?.$isEmpty('obj')) {
      const mockItems = [
        new Item({ title: 'Offer 1', limit: 1 }),
        new Item({ title: 'Offer 2', limit: 2 }),
        new Item({ title: 'Offer 3', limit: 3 }),
        new Item({ title: 'Offer 4', limit: 2 }),
      ];
  
      await Item.insertMany(mockItems);
    }

    // creating default user because we don't have yet the ability to sign in 
    const user = await User.findById(process.env.DEFAULT_USER_ID).exec();

    if (!user){
      await new User({ name: 'test-user', _id: process.env.DEFAULT_USER_ID }).save();
    }

    console.log('Successfully initialize mock data in mongodb');
  } catch (err) {
    console.error('Error initialized mock data in mongo db', err);
  }
};

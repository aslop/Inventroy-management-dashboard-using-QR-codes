import { connect, set, connection } from 'mongoose';

const initDb = () => {
  connect(`${process.env.MONGO_URL}/my-db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  set('useCreateIndex', true);
};

export { initDb, connection };

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class NewsCollection extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const News = new NewsCollection('News');

News.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

News.schema = new SimpleSchema({
  title: {
    type: String,
    max: 25
  },
  subtitle: {
    type: String,
    max: 25
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  },
  description: {
    type: String
  },
  featured: {
    type: Boolean
  }
  featuredImg: {
    type: String
  }
});

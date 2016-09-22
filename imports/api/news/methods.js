import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { News } from './news.js';

export const insert = new ValidatedMethod({
  name: 'news.insert',
  validate: News.schema.validator(),
  run({ title,
        subtitle,
        description,
        featured,
        featuredImg
      }) {

          const aNew = {
            title: title,
            subtitle: subtitle,
            createdAt = new Date(),
            description: description,
            featured: featured,
            featuredImg: featuredImg
          }

          News.insert(aNew);
      }
});

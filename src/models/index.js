// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EmbeddedVideo, ChannelDetails, Video, Channel } = initSchema(schema);

export {
  EmbeddedVideo,
  ChannelDetails,
  Video,
  Channel
};
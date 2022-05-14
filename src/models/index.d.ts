import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EmbeddedVideoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChannelDetailsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChannelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class EmbeddedVideo {
  readonly id: string;
  readonly videoLink?: string | null;
  readonly videoCategory?: string | null;
  readonly timestamp?: string | null;
  readonly comments?: (string | null)[] | null;
  readonly notes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<EmbeddedVideo, EmbeddedVideoMetaData>);
  static copyOf(source: EmbeddedVideo, mutator: (draft: MutableModel<EmbeddedVideo, EmbeddedVideoMetaData>) => MutableModel<EmbeddedVideo, EmbeddedVideoMetaData> | void): EmbeddedVideo;
}

export declare class ChannelDetails {
  readonly id: string;
  readonly channelName?: string | null;
  readonly channelDesc: string;
  readonly followers?: string[] | null;
  readonly following?: string[] | null;
  readonly channelProfileUrl: string;
  readonly ChannelToVideos?: (Video | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ChannelDetails, ChannelDetailsMetaData>);
  static copyOf(source: ChannelDetails, mutator: (draft: MutableModel<ChannelDetails, ChannelDetailsMetaData>) => MutableModel<ChannelDetails, ChannelDetailsMetaData> | void): ChannelDetails;
}

export declare class Video {
  readonly id: string;
  readonly posterUrl: string;
  readonly videoUrl: string;
  readonly videoTitle: string;
  readonly videoCategory: string;
  readonly timestamp: string;
  readonly views: number;
  readonly likes: number;
  readonly channelName: string;
  readonly notesUrl: string;
  readonly assignmentUrl: string;
  readonly shareUrl: string;
  readonly comments: string[];
  readonly channelUrl?: string | null;
  readonly videoDescription?: string | null;
  readonly channeldetailsID: string;
  readonly channelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Video, VideoMetaData>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video, VideoMetaData>) => MutableModel<Video, VideoMetaData> | void): Video;
}

export declare class Channel {
  readonly id: string;
  readonly channelName: string;
  readonly channelUrl: string;
  readonly channelDescription?: string | null;
  readonly videos?: (string | null)[] | null;
  readonly channelProfileUrl?: string | null;
  readonly Videos?: (Video | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Channel, ChannelMetaData>);
  static copyOf(source: Channel, mutator: (draft: MutableModel<Channel, ChannelMetaData>) => MutableModel<Channel, ChannelMetaData> | void): Channel;
}
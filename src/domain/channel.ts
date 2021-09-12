import { PostType, LoadImage, ScheduleTimeString, ChannelId } from '../@types/shared-kernel';

export type Channel = {
  id: ChannelId;
  type: PostType;
  loadImage: LoadImage;
  times: ScheduleTimeString[];
};
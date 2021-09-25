export interface ChannelFile {
  name: string;
  content: string;
}

export type ChannelDetails = {
  id: string;
  files: ChannelFile[];
  times: ScheduleTimeString[];
};

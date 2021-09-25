export interface ChannelFile {
  name: string;
  content: string;
}

export type Channel = {
  id: ChannelId;
  name: string;
  type: PostType;
  loadImage: LoadImage;
  times: string[];
  files: ChannelFile[];
};

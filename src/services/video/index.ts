import { VIDEO_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const VideoServices = {
  heygenMyVideos: () => apiServices.get(VIDEO_API.HEYGEN_MY_VIDEOS),
};

export default VideoServices;

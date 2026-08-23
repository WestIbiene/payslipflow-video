import { Config } from '@remotion/cli/config';

// Higher CRF = smaller file, lower quality. 18 is visually near-lossless
// and totally fine for a YouTube upload.
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');

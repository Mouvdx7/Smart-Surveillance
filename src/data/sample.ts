export type CameraStatus = "online" | "offline";

export type Camera = {
  id: string;
  name: { fr: string; ar: string };
  location: { fr: string; ar: string };
  status: CameraStatus;
  thumbnail: string;
  streamUrl: string;
};

export type AlertType = "motion" | "person" | "sound" | "offline";

export type Alert = {
  id: string;
  cameraId: string;
  type: AlertType;
  // ISO time
  at: string;
  thumbnail: string;
};

// Public sample HLS / mp4 loops — replaced later by user streams.
const SAMPLE_VIDEO_1 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const SAMPLE_VIDEO_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
const SAMPLE_VIDEO_3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
const SAMPLE_VIDEO_4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

const THUMB = (seed: string) => `https://picsum.photos/seed/${seed}/640/360?grayscale&blur=1`;

export const sampleCameras: Camera[] = [
  {
    id: "cam-1",
    name: { fr: "Entrée principale", ar: "المدخل الرئيسي" },
    location: { fr: "Devant la maison", ar: "أمام المنزل" },
    status: "online",
    thumbnail: THUMB("entry"),
    streamUrl: SAMPLE_VIDEO_1,
  },
  {
    id: "cam-2",
    name: { fr: "Cour intérieure", ar: "الفناء الداخلي" },
    location: { fr: "Arrière maison", ar: "خلف المنزل" },
    status: "online",
    thumbnail: THUMB("yard"),
    streamUrl: SAMPLE_VIDEO_2,
  },
  {
    id: "cam-3",
    name: { fr: "Garage", ar: "المرآب" },
    location: { fr: "Côté gauche", ar: "الجهة اليسرى" },
    status: "online",
    thumbnail: THUMB("garage"),
    streamUrl: SAMPLE_VIDEO_3,
  },
  {
    id: "cam-4",
    name: { fr: "Toit", ar: "السطح" },
    location: { fr: "Vue panoramique", ar: "إطلالة بانورامية" },
    status: "offline",
    thumbnail: THUMB("roof"),
    streamUrl: SAMPLE_VIDEO_4,
  },
];

const now = Date.now();
const m = (mins: number) => new Date(now - mins * 60_000).toISOString();

export const sampleAlerts: Alert[] = [
  { id: "a1", cameraId: "cam-1", type: "person", at: m(4), thumbnail: THUMB("a1") },
  { id: "a2", cameraId: "cam-2", type: "motion", at: m(22), thumbnail: THUMB("a2") },
  { id: "a3", cameraId: "cam-1", type: "motion", at: m(58), thumbnail: THUMB("a3") },
  { id: "a4", cameraId: "cam-4", type: "offline", at: m(120), thumbnail: THUMB("a4") },
  { id: "a5", cameraId: "cam-3", type: "sound", at: m(240), thumbnail: THUMB("a5") },
  { id: "a6", cameraId: "cam-2", type: "person", at: m(60 * 22), thumbnail: THUMB("a6") },
];

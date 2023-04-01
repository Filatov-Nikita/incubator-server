import { UPLOAD_DEST_PUBLIC } from '#app/config/app.js';

export function publicUrl(file) {
  if(!file) throw new Error('файл не определен');
  return `${UPLOAD_DEST_PUBLIC}/${file.filename}`;
}

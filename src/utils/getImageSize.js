export default function getImageSize({ file, url }) {
  return new Promise(resolve => {
    if (file) {
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();

        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };

        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    } else {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.src = url;
    }
  });
}

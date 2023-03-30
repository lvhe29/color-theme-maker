import fs from 'fs';

export const writeToFile = (folderPath, fileName, content) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFileSync(`${folderPath}/${fileName}`, content);
}
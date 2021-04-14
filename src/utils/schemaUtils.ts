import * as path from 'path';
import * as fs from 'fs-extra';

export const guessSchemaNameFromFilePath = async (filePath: string): Promise<string | false> => {
  const exists = await fs.pathExists(filePath);

  if (!exists) { return false; }

  const basename = path.basename(filePath);
  const isSchema = basename?.match(/[a-zA-Z0-9_\-]+\.schema\.json$/);

  if (!isSchema) { return false; }

  const name = basename.split(`.schema.json`)[0];

  if (!name || name.length === 0) { return false; }

  return name;
}
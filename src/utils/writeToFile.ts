import { UI } from "sketch";

const writeToFile = (string: string, filePath: string, fileName: string) => {
  // preparing file path
  const fileManager = NSFileManager.defaultManager();
  const fullPath = `${filePath}/${fileName}`;

  if (!fileManager.fileExistsAtPath(fullPath)) {
    // folder not exist
    if (
      !fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
        filePath,
        true,
        nil,
        nil
      )
    ) {
      // TODO: handle create folder error.
      throw null
    }
  }

  if (fileManager.fileExistsAtPath(fullPath)) {
    // file exist

    // TODO: overwrite files prompt

    /* 
    if (!fileManager.removeItemAtPath_error(fullPath, error)) {
      // TODO: handle create file error.
      throw null;
    } */
  }
  const objcStr = NSString.stringWithFormat("%@", string);
  return objcStr.writeToFile_atomically_encoding_error(
    fullPath,
    true,
    NSUTF8StringEncoding,
    null
  );
};

export default writeToFile;

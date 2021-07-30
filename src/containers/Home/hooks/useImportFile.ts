import { useState } from 'react';

const XLSX = window.require('xlsx');
const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

enum File {
  File1 = 'file1',
  File2 = 'file2',
}

const useImportFile = () => {
  const [file1Path, setFile1Path] = useState<string>('');
  const [file2Path, setFile2Path] = useState<string>('');
  const [file1, setFile1] = useState<any>({});
  const [file2, setFile2] = useState<any>({});

  const openFile = async (fileType: File) => {
    const response = await dialog.showOpenDialog({
      properties: ['openFile' /* , 'multiSelections' */],
    });

    const { canceled, filePaths } = response;
    if (canceled) return;
    const validFilePath = filePaths.find(
      (filePath: string) =>
        filePath.slice(filePath.length - 4, filePath.length) === 'xlsx'
    );

    if (validFilePath) {
      const workBook = XLSX.readFile(validFilePath);
      const sheetNames: string[] = workBook.SheetNames;

      const data: any = {};
      sheetNames.map((sheetName: string) => {
        const json = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        data[sheetName] = json;
        return null;
      });

      const next =
        fileType === File.File1
          ? { setPath: setFile1Path, setData: setFile1 }
          : { setPath: setFile2Path, setData: setFile2 };

      next.setPath(validFilePath);
      next.setData(data);
    } else {
      await dialog.showErrorBox('Error', 'Please choose .xlsx file');
    }
  };

  return {
    File,
    file1,
    file2,
    file1Path,
    file2Path,
    openFile,
  };
};

export default useImportFile;

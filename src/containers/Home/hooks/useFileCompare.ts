import { useState, useMemo } from 'react';

const generateBackgroundColor: (data: any) => string = (data: any) => {
  if (!data.value) return '';
  if (data.isNew) return '#55efc4';
  if (data.isDifferent) return '#fab1a0';
  return '';
};

const formatData = (data: any) => {
  if (!data) return null;
  return data.map((item: any) => {
    const result: any = {};
    Object.keys(item).map((key: string) => {
      result[key] = {
        value: item[key],
        isDifferent: true,
        isNew: true,
      };
    });
    return result;
  });
};

const useFileCompare = (file1: any, file2: any) => {
  const [activeKey, setActiveKey] = useState<string>('');

  const keys: string[] = useMemo(
    () => [...new Set([...Object.keys(file1), ...Object.keys(file2)])],
    [file1, file2]
  );

  const compareResult = useMemo(() => {
    if (!activeKey || !activeKey.trim()) return null;

    const file1Data = file1[activeKey];
    const file2Data = file2[activeKey];
    if (!file1Data || !file2Data)
      return {
        file1Data: formatData(file1Data),
        file2Data: formatData(file2Data),
      };

    const maxLength =
      file1Data.length > file2Data.length ? file1Data.length : file2Data.length;

    const file1DataResult = [];
    const file2DataResult = [];
    for (let i = 0; i < maxLength; i++) {
      const file1Row = file1Data[i];
      const file2Row = file2Data[i];

      const row1: any = {};
      const row2: any = {};

      const columnNames: string[] = [
        ...new Set([
          ...Object.keys(file1Row || []),
          ...Object.keys(file2Row || []),
        ]),
      ];
      columnNames.map((column) => {
        const isDifferent = file1Row?.[column] !== file2Row?.[column];
        const isNew = !file1Row?.[column] || !file2Row?.[column];

        row1[column] = {
          value: file1Row?.[column],
          isDifferent,
          isNew,
        };

        row2[column] = {
          value: file2Row?.[column],
          isDifferent,
          isNew,
        };

        return null;
      });

      if (file1Row) {
        file1DataResult[i] = row1;
      }

      if (file2Row) {
        file2DataResult[i] = row2;
      }
    }

    return { file1Data: file1DataResult, file2Data: file2DataResult };
  }, [activeKey, file1, file2]);

  const columnNames = useMemo(() => {
    if (!compareResult) return [];
    const result = compareResult.file1Data || compareResult.file2Data;
    if (!result[0]) return [];
    return Object.keys(result[0]);
  }, [compareResult]);

  return {
    keys,
    compareResult,
    columnNames,
    setActiveKey,
    generateBackgroundColor,
  };
};

export default useFileCompare;

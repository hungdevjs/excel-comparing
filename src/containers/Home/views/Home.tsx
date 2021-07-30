import React, { FC } from 'react';
import { Row, Col, Input } from 'reactstrap';
import Select from 'react-select';

import folder from '../../../assets/images/folder.png';

import useImportFile from '../hooks/useImportFile';
import useFileCompare from '../hooks/useFileCompare';

import TableResult from '../components/TableResult';

const Home: FC = () => {
  const {
    File,
    file1,
    file2,
    file1Path,
    file2Path,
    openFile,
  } = useImportFile();

  const {
    keys,
    compareResult,
    columnNames,
    setActiveKey,
    generateBackgroundColor,
  } = useFileCompare(file1, file2);

  const fileInputs = [
    { type: File.File1, label: 'Import file 1', path: file1Path },
    { type: File.File2, label: 'Import file 2', path: file2Path },
  ];

  return (
    <div className="p-2 wrapper">
      <h5>Excel comparing</h5>
      <Row className="mb-2">
        {fileInputs.map((fileInput) => (
          <Col
            md={6}
            sm={6}
            xs={6}
            key={fileInput.type}
            className="d-flex align-items-center"
          >
            <Input
              className="mr-3 cursor-pointer"
              value={fileInput.path || fileInput.label}
              onClick={() => openFile(fileInput.type)}
            />
            <img
              src={folder}
              alt="folder icon"
              className="icon cursor-pointer"
              onClick={() => openFile(fileInput.type)}
            />
          </Col>
        ))}
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <Select
            styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
            options={keys.map((key) => ({ label: key, value: key }))}
            onChange={(e: any) => setActiveKey(e.value)}
            placeholder="Select sheet to check different"
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          <h6>Compare result</h6>
          <hr />
        </Col>
        <Col md={6} sm={6} xs={6}>
          <TableResult
            data={compareResult?.file1Data}
            columnNames={columnNames}
            generateBackgroundColor={generateBackgroundColor}
          />
        </Col>
        <Col md={6} sm={6} xs={6}>
          <TableResult
            data={compareResult?.file2Data}
            columnNames={columnNames}
            generateBackgroundColor={generateBackgroundColor}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

import React from "react";

interface ObjectDataSourceProps<T> {
  CreateMethod: (item: T) => Promise<any>;
  CreateNewEntity?: () => Promise<any>;
  SelectMethod: (filter?: Partial<T>) => Promise<T[]>;
  UpdateMethod: (item: T) => Promise<any>;
  DeleteMethod: (id: string) => Promise<any>;
  SelectCountMethod?: (filter?: Partial<T>) => Promise<number>; // Optional method for count
  children: (dataSource: ObjectDataSource<T>) => React.ReactNode;
}

class ObjectDataSource<T> extends React.Component<ObjectDataSourceProps<T>> {
  constructor(props: ObjectDataSourceProps<T>) {
    super(props);
  }

  async CreateNewEntity(): Promise<any> {
    if (this.props.CreateNewEntity) {
      return await this.props.CreateNewEntity();
    } else {
      console.error("CreateMethod is not defined");
      return null;
    }
  }

  async CreateMethod(item: T): Promise<any> {
    if (this.props.CreateMethod) {
      return await this.props.CreateMethod(item);
    } else {
      console.error("CreateMethod is not defined");
      return null;
    }
  }

  async SelectMethod(filter?: Partial<T>): Promise<T[]> {
    if (this.props.SelectMethod) {
      return await this.props.SelectMethod(filter);
    } else {
      console.error("SelectMethod is not defined");
      return [];
    }
  }

  async UpdateMethod(item: T): Promise<any> {
    if (this.props.UpdateMethod) {
      return await this.props.UpdateMethod(item);
    } else {
      console.error("UpdateMethod is not defined");
      return null;
    }
  }

  async DeleteMethod(id: string): Promise<any> {
    if (this.props.DeleteMethod) {
      return await this.props.DeleteMethod(id);
    } else {
      console.error("DeleteMethod is not defined");
      return null;
    }
  }

  async SelectCountMethod(filter?: Partial<T>): Promise<number> {
    if (this.props.SelectCountMethod) {
      return await this.props.SelectCountMethod(filter);
    } else {
      console.error("SelectCountMethod is not defined");
      return 0;
    }
  }

  render() {
    const { children } = this.props;
    return <div>{children(this)}</div>; // Correctly render children as a function
  }
}
export default ObjectDataSource;


/*
const createRecord = async (record: any) => {
  console.log("Creating record:", record);
};

const selectRecords = async (filter?: Partial<any>): Promise<any[]> => {
  console.log("Selecting records with filter:", filter);
  return [
    { id: "1", name: "Record 1" },
    { id: "2", name: "Record 2" },
  ];
};

const updateRecord = async (record: any) => {
  console.log("Updating record:", record);
};

const deleteRecord = async (id: string) => {
  console.log("Deleting record with id:", id);
};

const selectRecordCount = async (filter?: Partial<any>): Promise<number> => {
  console.log("Counting records with filter:", filter);
  return 42; // Example: Returning a total count
};




import React, { useState } from "react";
import ObjectDataSource from "./ObjectDataSource";

const MyComponent: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleFetchRecords = async (dataSource: ObjectDataSource<any>) => {
    const fetchedRecords = await dataSource.select();
    setRecords(fetchedRecords);

    const count = await dataSource.selectCount();
    setTotalCount(count);
  };

  return (
    <ObjectDataSource
      CreateMethod={createRecord}
      SelectMethod={selectRecords}
      UpdateMethod={updateRecord}
      DeleteMethod={deleteRecord}
      SelectCountMethod={selectRecordCount}
    >
      {(dataSource) => (
        <div>
          <button onClick={() => handleFetchRecords(dataSource)}>
            Fetch Records
          </button>
          <p>Total Count: {totalCount}</p>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {record.name}{" "}
                <button onClick={() => dataSource.delete(record.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ObjectDataSource>
  );
};

export default MyComponent;


*/
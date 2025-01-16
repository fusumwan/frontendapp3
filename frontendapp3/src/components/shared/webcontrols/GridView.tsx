import React, { useEffect, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/css/tabulator.min.css'; // Required Tabulator styles
import debounce from 'lodash/debounce';
import { DateTime } from 'luxon';
import { format } from 'path';
import AppDTOManager from '../../../utils/AppDTOManager';
import { AjaxHandler, AjaxConfig } from '../../../utils/AjaxHandler';
import ConfirmationDialogComponent from './ConfirmationDialogComponent';
import FromView from './FromView';
import { ComponentProps } from '../../../interfaces/ComponentProps';
import { ColumnDefinition as TabulatorColumnDefinition } from 'react-tabulator';
import { TranslationRecord } from "../../../interfaces/ComponentProps/TranslationRecord";
import ObjectDataSource from './ObjectDataSource';
type ColumnDefinition = TabulatorColumnDefinition;

// Define the type for datasource_columns
interface DataSourceColumn {
  title: string;
  field: string;
  sorter?: "string" | "number";
  value?: string;
  mode: {
    [key: string]: {
      visible: boolean;
      required?: boolean;
      type?: {
        component: string;
        type: string;
        dataSource?: any[];
        dataTextField?: string;
        dataTextValue?: string;
        pattern?: string;
        value?: string;
      };
    };
  };
}

interface GridViewProps {
    appContent: any;   // Keep if used for other props or remove if unnecessary
    dataSource: ObjectDataSource<any>; // Adjust type as needed
    datasource_columns: DataSourceColumn[];
  }


const GridView: React.FC<GridViewProps> = ({ appContent,dataSource,datasource_columns }) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [createRecord, setCreateRecord] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);

  // Pagination-related states
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Records per page
  const [totalPages, setTotalPages] = useState(0);


  const resizeHandler = debounce(() => {
    console.log('Resize handled!');
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      // If this is the "ResizeObserver loop limit exceeded" type error, ignore it
      if (e.message?.includes('ResizeObserver loop')) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };

    window.addEventListener('error', handleResizeObserverError);
    return () => {
      window.removeEventListener('error', handleResizeObserverError);
    };
  }, []);

  // Fetch total record count on component mount
  useEffect(() => {
    SelectCountMethod();
  }, []);

  // On initial render, fetch data
  useEffect(() => {
    SelectPageMethod(currentPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewRecord = async () => {

    try {
        // Fetch a new record template from the data source
        const newRecord = await dataSource.CreateNewEntity();
        
        // Update the local state to include the new record
        setCreateRecord(newRecord);

        // Optionally log or alert the user about the new record creation
        console.log('New record created:', newRecord);
    } catch (error) {
        // Handle errors during the record creation
        console.error('Error creating a new record:', error);
    }
  };

  const createFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };

  const loadRowData = (data: any) => {
    setRowData(data);
  };

  const SelectCountMethod = async () => {
    
    const count = await dataSource.SelectCountMethod();
    if(count !== undefined){
        // Add fallback to avoid NaN
        const safeCount = isNaN(count) ? 0 : count;
        const safePageSize = isNaN(pageSize) || pageSize <= 0 ? 1 : pageSize;
        // Calculate pages
        const countPage: number = Math.ceil(safeCount / safePageSize);
        setTotalRecords(count);
        setTotalPages(countPage); // Calculate total pages
        
        if (currentPage > countPage) {
          setCurrentPage(countPage)
          SelectPageMethod(countPage, pageSize);
        }
        
    }
  };

  const SelectPageMethod = async (page: number = 1, pageSize: number = 10) => {
    
    const pageFilter = {
        items:{
            "page":{
                value:page
            },
            "pageSize":{
                value:pageSize
            },
        }
    }
    const result = await dataSource.SelectMethod(pageFilter);
    loadRowData(result);
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    setDeleteRecordId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteRecordId) return;
    
    var result=await dataSource.DeleteMethod(deleteRecordId);
    if (result!==undefined){
        console.log("Record deleted successfully.");
        SelectCountMethod();
        SelectPageMethod(currentPage, pageSize);
        setShowConfirmDialog(false);
        setDeleteRecordId(null);
    }
  };

  const handleEdit = (record: any) => {
    setEditRecord(record);
  };

  const UpdateMethod = async (updatedRecord: any) => {
    
    var result=await dataSource.UpdateMethod(updatedRecord);
    if (result!==undefined){
        console.log("Record updated successfully.");
        SelectCountMethod();

        // Refetch data
        SelectPageMethod(currentPage, pageSize);
        setEditRecord(null);
    }
  };

  const CreateMethod = async (updatedRecord: any) => {
    
    var result=await dataSource.CreateMethod(updatedRecord);
    if (result!==undefined){
        console.log("Record updated successfully.");
        SelectCountMethod();

        // Refetch data
        SelectPageMethod(currentPage, pageSize);
        setEditRecord(null);
    }
  };



  /**
   * Tabulator columns.
   * - `title` replaces `headerName`.
   * - We use a `formatter`/`cellClick` approach to replicate your "Actions" column.
   * - For filtering/sorting, Tabulator uses `headerFilter` (if desired) and `sorter` properties.
   */

  function getGridColumns(
    datasource_columns: DataSourceColumn[],
    tabulator_columns: string,
    mode: string
  ): ColumnDefinition[] {
    return datasource_columns.map(column => {
      return {
        title: column.title,
        field: column.field,
        sorter: column.sorter, // Keep sorter if it exists
        visible: column.mode[mode]?.visible || false, // Use the visibility for the given mode
      };
    });
  }


  const tabulator_columns = "tabulator_columns";
  const mode = "retrieve";

  const columns: ColumnDefinition[] = [
    ...getGridColumns(datasource_columns, tabulator_columns, mode),
    {
      title: 'Actions',
      field: 'id',
      formatter: () => `
        <button class="edit-button">Edit</button>
        <span style="margin: 0 8px;"></span>
        <button class="delete-button">Delete</button>
      `,
      cellClick: (e: any, cell: any) => {
        const rowData = cell.getRow().getData();
        if (e.target.classList.contains('edit-button')) {
          setEditRecord(rowData);
        } else if (e.target.classList.contains('delete-button')) {
          setDeleteRecordId(rowData.id);
          setShowConfirmDialog(true);
        }
      },
    },
  ];






  return (
    <div style={{ width: '100%' }}>
      {loading && <p>Loading...</p>}

      <button
        onClick={() => handleAddNewRecord()}
        className="btn btn-primary"
      >
        Add New Record
      </button>



      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200" style={{ height: 'auto', width: '100%',position: 'relative', zIndex: 1  }}>
        <ReactTabulator
          data={rowData}
          columns={columns as TabulatorColumnDefinition[]}
          layout="fitColumns"
          options={{
            responsiveLayout: 'false',
          }}
        />
      </div>



      {/* Manual pagination buttons (previous/next) */}
      <div style={{ marginTop: '1rem' }}>
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            if (currentPage > 1) {
              SelectPageMethod(currentPage - 1, pageSize);
            }
          }}
        >
          Previous
        </button>
        <span style={{ margin: '0 12px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              SelectPageMethod(currentPage + 1, pageSize);
            }
          }}
        >
          Next
        </button>
      </div>

      {showConfirmDialog && (
        <ConfirmationDialogComponent
          message="Are you sure you want to delete this record?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
          
        />
      )}

      {editRecord && (
        <FromView<TranslationRecord>
          record={editRecord}
          onSave={UpdateMethod}
          onCancel={() => setEditRecord(null)}
          datasource_columns={datasource_columns}
          mode='update'
        />
      )}

      {createRecord && (
        <FromView<TranslationRecord>
          record={createRecord}
          onSave={CreateMethod}
          onCancel={() => setCreateRecord(null)}
          datasource_columns={datasource_columns}
          mode='create'
        />
      )}
    </div>
  );
};

export default GridView;

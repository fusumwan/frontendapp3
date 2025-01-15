import React, { useEffect, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/css/tabulator.min.css'; // Required Tabulator styles
import debounce from 'lodash/debounce';
import AppDTOManager from '../../../../utils/AppDTOManager';
import { AjaxHandler, AjaxConfig } from '../../../../utils/AjaxHandler';
import ConfirmationDialogComponent from './ConfirmationDialogComponent';
import EditModalComponent from './EditModalComponent';
import { ComponentProps } from '../../../../interfaces/ComponentProps';
import { DateTime } from 'luxon';
import { format } from 'path';

const TranslationRecordManagementComponent: React.FC<ComponentProps> = ({ appContent }) => {
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

  // Authentication/domain info
  const domain = AjaxHandler.getInstance().getDomain();
  const email = appContent?.applicationUserDataSetting.applicationUserData.userProfile.email;
  const token = appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken;
 
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
    fetchTranslationRecordCount();
  }, []);

  // On initial render, fetch data
  useEffect(() => {
    fetchTranslationRecords(currentPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewRecord = () => {
    // Alternatively, define manually if no DTOManager
    const newRecordManual = {
        id: '',
        email: appContent?.applicationUserDataSetting.applicationUserData.userProfile.email || '',
        token: appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken || '',
        originalText: '',
        fromLanguage: '',
        translatedText: '',
        toLanguage: '',
        dayUtc: '',
    };
    setCreateRecord(newRecordManual);
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

  const fetchTranslationRecordCount = async () => {
    const config: AjaxConfig = {
      url: `${domain}/api/TranslationRecordControllerImpl/get-translation-record-count`,
      method: 'POST',
      data: new FormData(), // Using FormData for [FromForm]
      contentType: 'multipart/form-data',
      beforeSend: () => console.log('Fetching record count...'),
      success: (response: any) => {
        const count  = parseInt(response.count || "0",10);

        // Add fallback to avoid NaN
        const safeCount = isNaN(count) ? 0 : count; 
        const safePageSize = isNaN(pageSize) || pageSize <= 0 ? 1 : pageSize;

        // Calculate pages
        const countPage: number = Math.ceil(safeCount / safePageSize);

        setTotalRecords(count);
        setTotalPages(countPage); // Calculate total pages
        if(currentPage>countPage){
          setCurrentPage(countPage)
          fetchTranslationRecords(countPage, pageSize);
        }
      },
      error: (err: any) => console.error('Failed to fetch record count:', err),
      complete: () => console.log('Fetch complete'),
    };

    // Add email and token to FormData
    const formData = config.data as FormData;
    formData.append('email', email);
    formData.append('token', token);

    AjaxHandler.getInstance().sendRequest(config);
  };

  const fetchTranslationRecords = async (page: number = 1, pageSize: number = 10) => {
    setLoading(true);
    const data = createFormData({
      email,
      token,
      page,
      pageSize,
      orderByColumns: ['Id'],
    });

    const ajaxConfig: AjaxConfig = {
      url: `${domain}/api/TranslationRecordControllerImpl/get-page-translation-records`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: (response: any) => {
        loadRowData(response);
        setCurrentPage(page);
      },
      error: (err: any) => console.error('Error fetching records:', err),
      complete: () => setLoading(false),
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const handleDelete = (id: string) => {
    setDeleteRecordId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteRecordId) return;
    setLoading(true);
    const data = createFormData({ email, token, id: deleteRecordId });

    const ajaxConfig: AjaxConfig = {
      url: `${domain}/api/TranslationRecordControllerImpl/delete-translation-record`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: () => {
        alert('Record deleted successfully.');
        // Refetch data (staying on same page or resetting to page 1)
        fetchTranslationRecordCount();
        fetchTranslationRecords(currentPage, pageSize);
        
      },
      error: (err: any) => console.error('Error deleting record:', err),
      complete: () => {
        setLoading(false);
        setShowConfirmDialog(false);
        setDeleteRecordId(null);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const handleEdit = (record: any) => {
    setEditRecord(record);
  };

  const saveEditedRecord = async (updatedRecord: any) => {
    setLoading(true);
    const data = createFormData({ email, token, ...updatedRecord });
    const ajaxConfig: AjaxConfig = {
      url: `${domain}/api/TranslationRecordControllerImpl/save-translation-record`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: () => {
        alert('Record updated successfully.');
        fetchTranslationRecordCount();
        
        // Refetch data
        fetchTranslationRecords(currentPage, pageSize);
      },
      error: (err: any) => console.error('Error updating record:', err),
      complete: () => {
        setLoading(false);
        setEditRecord(null);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const createEditedRecord = async (updatedRecord: any) => {
    setLoading(true);
    var record_json={ email, token, ...updatedRecord }
    delete record_json.id;
    const data = createFormData(record_json);
    const ajaxConfig: AjaxConfig = {
      url: `${domain}/api/TranslationRecordControllerImpl/create-translation-record`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: () => {
        alert('Record updated successfully.');
        fetchTranslationRecordCount();
        // Refetch data
        fetchTranslationRecords(currentPage, pageSize);
      },
      error: (err: any) => console.error('Error updating record:', err),
      complete: () => {
        setLoading(false);
        setEditRecord(null);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const lang_json=[
    {
       "id":"072d2631-534e-974b-b4c7-bf889a3bad77",
       "language_name":"English",
       "language_code":"en"
    },
    {
       "id":"6545633f-534e-545g-b4c7-bf889a3bad77",
       "language_name":"Chinese",
       "language_code":"zh"
    }
]

  /**
   * Tabulator columns.
   * - `title` replaces `headerName`.
   * - We use a `formatter`/`cellClick` approach to replicate your "Actions" column.
   * - For filtering/sorting, Tabulator uses `headerFilter` (if desired) and `sorter` properties.
   */
  const columns = [
  {
    title: 'Original Text',
    field: 'originalText',
    sorter: 'string' as const, // Ensures proper casting for literal type
    visible: true,  // This hides the column
  },
  {
    title: 'From Language',
    field: 'fromLanguage',
    sorter: 'string' as const,
    visible: true,  // This hides the column
  },
  {
    title: 'Translated Text',
    field: 'translatedText',
    sorter: 'string' as const,
    visible: true,  // This hides the column
  },
  {
    title: 'To Language',
    field: 'toLanguage',
    sorter: 'string' as const,
    visible: true,  // This hides the column
  },
  {
    title: 'Date (UTC)',
    field: 'dayUtc',
    visible: true,  // This hides the column
  },
  {
    title: 'Created AT (UTC)',
    field: 'createdAtUtc',
    visible: false,  // This hides the column
  },
  {
    title: 'User Id',
    field: 'createdByUserId',
    sorter: 'string' as const,
    visible: false,  // This hides the column
  },
  {
    title: 'Actions',
    field: 'id',
    formatter: () => {
      return `
        <button class="edit-button">Edit</button>
        <span style="margin: 0 8px;"></span>
        <button class="delete-button">Delete</button>
      `;
    },
    cellClick: (e: any, cell: any) => {
      const rowData = cell.getRow().getData();
      if (e.target.classList.contains('edit-button')) {
        setEditRecord(rowData);
      } else if (e.target.classList.contains('delete-button')) {
        setDeleteRecordId(rowData.id);
        setShowConfirmDialog(true);
      }
    }
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

      

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200" style={{ height: 'auto', width: '100%' }}>
  <ReactTabulator
    data={rowData}
    columns={columns}
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
              fetchTranslationRecords(currentPage - 1, pageSize);
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
              fetchTranslationRecords(currentPage + 1, pageSize);
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
        <EditModalComponent
          record={editRecord}
          onSave={saveEditedRecord}
          onCancel={() => setEditRecord(null)}
        />
      )}

     {createRecord && (
        <EditModalComponent
          record={createRecord}
          onSave={createEditedRecord}
          onCancel={() => setCreateRecord(null)}
        />
      )}
    </div>
  );
};

export default TranslationRecordManagementComponent;

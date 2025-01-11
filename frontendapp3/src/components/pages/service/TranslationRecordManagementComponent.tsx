
import React, { useEffect, useState } from "react";
import Table from "../../shared/Table";
import PaginationComponent from "./PaginationComponent";
import EditModalComponent from "./EditModalComponent";
import ConfirmationDialogComponent from "./ConfirmationDialogComponent";
import AddNewRecordButton from "./AddNewRecordButton";
import { AjaxHandler } from "../../../utils/AjaxHandler";
import AppDTOManager from "../../../utils/AppDTOManager";
import { ComponentProps } from '../../../interfaces/ComponentProps';

const TranslationRecordManagementComponent: React.FC<ComponentProps> = ({appContent}) => {
  const [records, setRecords] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<any | null>(null);
  const domain = AjaxHandler.getInstance().getDomain();
  const email=appContent?.applicationUserDataSetting.applicationUserData.userProfile.email;
  const token=appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken;
  
  const fetchRecords = () => {

    const ajaxConfig = {
      url: `${domain}/api/records`,
      method: "GET" as "GET",
      contentType: "application/json",
      data: JSON.stringify({
        page: currentPage,
        size: pageSize,
        search: searchTerm,
        email: email,
        token: token,
      }),
      success: (response: any) => {
        setRecords(response.items);
        setTotalRecords(response.totalCount);
      },
      error: (err: any) => {
        console.error("Error fetching records:", err);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const handleDelete = () => {
    if (!deletingRecord) return;
    const ajaxConfig = {
      url: `${domain}/api/records/${deletingRecord.id}`,
      method: "DELETE" as "DELETE",
      contentType: "application/json",
      data: JSON.stringify({
        email: email,
        token: token,
      }),
      success: () => {
        setDeletingRecord(null);
        fetchRecords();
      },
      error: (err: any) => {
        console.error("Error deleting record:", err);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const handleEditSave = () => {
    setEditingRecord(null);
    fetchRecords();
  };

  useEffect(() => {
    fetchRecords();
  }, [currentPage, pageSize, searchTerm]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Translation Records</h2>
        <AddNewRecordButton />
      </div>
      <input
        type="text"
        placeholder="Search records"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <Table
        data={records}
        columns={[
          { label: "Original Text", key: "original_text" },
          { label: "From Language", key: "from_lang" },
          { label: "Translated Text", key: "translated_text" },
          { label: "To Language", key: "to_lang" },
          { label: "Day (UTC)", key: "day" },
          {
            label: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex gap-2">
                <button
                  className="text-blue-500"
                  onClick={() => setEditingRecord(record)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => setDeletingRecord(record)}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalRecords={totalRecords}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />
      {editingRecord && (
        <EditModalComponent
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleEditSave}
        />
      )}
      {deletingRecord && (
        <ConfirmationDialogComponent
          message="Are you sure you want to delete this record?"
          onConfirm={handleDelete}
          onCancel={() => setDeletingRecord(null)}
        />
      )}
    </div>
  );
};

export default TranslationRecordManagementComponent;

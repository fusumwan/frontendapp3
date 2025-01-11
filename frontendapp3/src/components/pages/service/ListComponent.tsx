import React, { useEffect, useState } from "react";
import Table from "../../shared/Table";
import PaginationComponent from "./PaginationComponent";
import EditModalComponent from "./EditModalComponent";
import ConfirmationDialogComponent from "./ConfirmationDialogComponent";
import { AjaxHandler } from "../../../utils/AjaxHandler";
import AppDTOManager from "../../../utils/AppDTOManager";
import { TranslationRecord } from "../../../interfaces/ComponentProps/TranslationRecord";
import { ComponentProps } from '../../../interfaces/ComponentProps';


const ListComponent: React.FC<ComponentProps> = ({appContent}) => {
  const [records, setRecords] = useState<TranslationRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<TranslationRecord | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const domain = AjaxHandler.getInstance().getDomain();
  const email=appContent?.applicationUserDataSetting.applicationUserData.userProfile.email;
  const token=appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken;
  
  const fetchRecords = async () => {
    const ajaxConfig = {
      url: `${domain}/api/records`,
      method: "GET" as "GET",
      data: {
        page: currentPage,
        size: pageSize,
        search: searchTerm,
        email: email,
        token: token,
      },
      success: (response: any) => {
        setRecords(response.items);
        setTotalRecords(response.totalCount);
      },
      error: (err: any) => {
        console.error("Failed to fetch records:", err);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
  };

  const handleEdit = (record: TranslationRecord) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const handleDelete = (record: TranslationRecord) => {
    setSelectedRecord(record);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecord) return;
    
    const ajaxConfig = {
      url: `${domain}/api/records/${selectedRecord.id}`,
      method: "DELETE" as "DELETE",
      data: {
        email: email,
        token: token,
      },
      success: () => {
        alert("Record deleted successfully.");
        fetchRecords();
      },
      error: (err: any) => {
        console.error("Failed to delete record:", err);
      },
    };
    AjaxHandler.getInstance().sendRequest(ajaxConfig);
    setShowConfirmationDialog(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [currentPage, pageSize, searchTerm]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Translation Records</h2>
      <input
        type="text"
        placeholder="Search records..."
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
            key: "id",
            render: (_, row) => (
              <div className="flex gap-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(row)}
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
      {showEditModal && selectedRecord && (
        <EditModalComponent
          record={selectedRecord}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedRecord) => {
            setShowEditModal(false);
            setRecords((prevRecords) =>
              prevRecords.map((record) =>
                record.id === updatedRecord.id ? updatedRecord : record
              )
            );
          }}
        />
      )}
      {showConfirmationDialog && (
        <ConfirmationDialogComponent
          message="Are you sure you want to delete this record?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmationDialog(false)}
        />
      )}
    </div>
  );
};

export default ListComponent;

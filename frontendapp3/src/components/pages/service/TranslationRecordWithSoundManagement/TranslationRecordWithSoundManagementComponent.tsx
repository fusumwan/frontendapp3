import React, { useEffect, useState } from 'react';
import GridView from '../../../shared/webcontrols/GridView';
import { ComponentProps } from '../../../../interfaces/ComponentProps';
import { AjaxHandler, AjaxConfig } from '../../../../utils/AjaxHandler';
import ObjectDataSource from '../../../shared/webcontrols/ObjectDataSource';
import { ColumnDefinition as TabulatorColumnDefinition } from 'react-tabulator';
type ColumnDefinition = TabulatorColumnDefinition;


// Define the type for datasource_columns
interface DataSourceColumn {
    title: string;
    field: string;
    sorter?: "string" | "number";
    value?: string | any;
    mode: {
      [key: string]: {
        visible: boolean;
        required?: boolean;
        ele?: {
          component: string;
          type?: string;
          dataSource?: any[] | null;
          dataTextField?: string;
          dataTextValue?: string;
          pattern?: string;
          value?: string;
        };
      };
    };
  }


interface filterItem {
  items: {
    [key: string]: {
      value: any;
    };
  }
}


const TranslationRecordWithSoundManagementComponent: React.FC<ComponentProps> = ({ appContent }) => {
  const [updateMethodAPI, setUpdateMethodAPI] = useState<string | null>(null);
  const [createMethodAPI, setCreateMethodAPI] = useState<string | null>(null);
  const [deleteMethodAPI, setDeleteMethodAPI] = useState<string | null>(null);
  const [selectMethodAPI, setSelectMethodAPI] = useState<string | null>(null);
  const [selectCountMethodAPI, setSelectCountMethodAPI] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const domain = AjaxHandler.getInstance().getDomain();
  const userId = appContent?.applicationUserDataSetting.applicationUserData.userProfile.id;
  const email = appContent?.applicationUserDataSetting.applicationUserData.userProfile.email;
  const token = appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken;
  const lang_json = [
    {
      "id": "072d2631-534e-974b-b4c7-bf889a3bad77",
      "language_name": "English",
      "language_code": "en"
    },
    {
      "id": "987d2631-534e-974b-b4c7-bf889a3bad77",
      "language_name": "Chinese",
      "language_code": "tw"
    }
  ]


  const categories_json = [
    {
      "Id": "20b011ed-40c4-16c9-0e37-a56ece3cbcda",
      "Name": "UNIVERSAL ENGLISH"
    }
  ]
  
  const datasource_columns: DataSourceColumn[] = [
    {
      "title": "Id",
      "field": "id",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": false,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        }
      }
    },
    {
      "title": "CategoriesId",
      "field": "categoriesId",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": categories_json,
            "dataTextField": "Name",
            "dataTextValue": "Id"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": categories_json,
            "dataTextField": "Name",
            "dataTextValue": "Id"
          }
        }
      }
    },
    {
      "title": "CreatedAtUtc",
      "field": "createdAtUtc",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": false,
          "required": true
        },
        "create": {
          "visible": true,
          "required": false,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        }
      }
    },
    {
      "title": "CreatedByUserId",
      "field": "createdByUserId",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": false,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "hidden"
          }
        }
      }
    },
    {
      "title": "DayUtc",
      "field": "dayUtc",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Datepicker",
            "type": "text",
            "pattern": "YYYY-MM-DD"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Datepicker",
            "type": "text",
            "pattern": "YYYY-MM-DD"
          }
        }
      }
    },
    {
      "title": "Delay",
      "field": "delay",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        }
      }
    },
    {
      "title": "Duration",
      "field": "duration",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        }
      }
    },
    {
      "title": "FromLanguage",
      "field": "fromLanguage",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": lang_json,
            "dataTextField": "language_name",
            "dataTextValue": "language_code"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": lang_json,
            "dataTextField": "language_name",
            "dataTextValue": "language_code"
          }
        }
      }
    },
    {
      "title": "OriginalText",
      "field": "originalText",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        }
      }
    },
    {
      "title": "Priority",
      "field": "priority",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        }
      }
    },
    {
      "title": "RepeatOriginal",
      "field": "repeatOriginal",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        }
      }
    },
    {
      "title": "RepeatTranslated",
      "field": "repeatTranslated",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "number"
          }
        }
      }
    },
    {
      "title": "SoundFileName",
      "field": "soundFileName",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        }
      }
    },
    {
      "title": "ToLanguage",
      "field": "toLanguage",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": lang_json,
            "dataTextField": "language_name",
            "dataTextValue": "language_code"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Dropdownlist",
            "type": "text",
            "dataSource": lang_json,
            "dataTextField": "language_name",
            "dataTextValue": "language_code"
          }
        }
      }
    },
    {
      "title": "TranslatedText",
      "field": "translatedText",
      "sorter": "string",
      "value": null,
      "mode": {
        "retrieve": {
          "visible": true,
          "required": true
        },
        "create": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        },
        "update": {
          "visible": true,
          "required": true,
          "ele": {
            "component": "Input",
            "type": "text"
          }
        }
      }
    }
  ]
  

    const _updateMethodAPI='/api/TranslationWithSoundRecordControllerImpl/save-translation-with-sound-record';
    const _createMethodAPI='/api/TranslationWithSoundRecordControllerImpl/create-translation-with-sound-record';
    const _deleteMethodAPI='/api/TranslationWithSoundRecordControllerImpl/delete-translation-with-sound-record';
    const _selectMethodAPI='/api/TranslationWithSoundRecordControllerImpl/get-page-translation-with-sound-records';
    const _selectCountMethodAPI='/api/TranslationWithSoundRecordControllerImpl/get-translation-with-sound-record-count';
    useEffect(() => {
      setUpdateMethodAPI(_updateMethodAPI);
      setCreateMethodAPI(_createMethodAPI);
      setDeleteMethodAPI(_deleteMethodAPI);
      setSelectMethodAPI(_selectMethodAPI);
      setSelectCountMethodAPI(_selectCountMethodAPI);
    }, []);


  const createFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };
  


 const addDefaultFields = (entity: any) => {
  return {
    ...entity,
    email: email || '',
    token: token || '',
  };
};

 const CreateNewEntity = async () => {
  const newEntity = {
    id: '',
    originalText: '',
    fromLanguage: '',
    translatedText: '',
    toLanguage: '',
    priority: 0,
    repeatOriginal: 0,
    repeatTranslated: 0,
    delay: 0,
    duration: 0,
    soundFileName: 0,
    dayUtc: '',
    createdAtUtc: '',
    categoriesId: '',
    createdByUserId: userId
  };
  return addDefaultFields(newEntity);
};

 
 const CreateMethod = async (updatedRecord: any) => {
    console.log("==============Start CreateMethod========");
    setLoading(true);
    var record_json = { email, token, ...updatedRecord }
    
    console.log(record_json);
    delete record_json.id;
    const data = createFormData(record_json);
    const ajaxConfig: AjaxConfig = {
      url: `${domain}${_createMethodAPI}`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: (response: any) => {
        alert('Record updated successfully.');
        //SelectCountMethod();
        // Refetch data
        //SelectPageMethod(currentPage, pageSize);
      },
      error: (err: any) => console.error('Error updating record:', err),
      complete: () => {
        setLoading(false);
        //setEditRecord(null);
      },
    };
    const result = await AjaxHandler.getInstance().sendRequestAsync(ajaxConfig);
    console.log("==============End CreateMethod========");
    return result;
  };


  const DeleteMethod = async (id: string) => {
    console.log("Deleting record with id:", id);

    if (!id) return;
    setLoading(true);
    const data = createFormData({ email, token, id: id });

    const ajaxConfig: AjaxConfig = {
      url: `${domain}${_deleteMethodAPI}`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: (response: any) => {
        alert('Record deleted successfully.');
        // Refetch data (staying on same page or resetting to page 1)

      },
      error: (err: any) => console.error('Error deleting record:', err),
      complete: () => {
        setLoading(false);
      },
    };
    const result = await AjaxHandler.getInstance().sendRequestAsync(ajaxConfig);
    return result;
  };
  const UpdateMethod = async (updatedRecord: any) => {
      setLoading(true);
      const data = createFormData({ email, token, ...updatedRecord });
      const ajaxConfig: AjaxConfig = {
        url: `${domain}${_updateMethodAPI}`,
        method: 'POST',
        data,
        contentType: 'multipart/form-data',
        success: (response: any) => {
          alert('Record updated successfully.');
        },
        error: (err: any) => console.error('Error updating record:', err),
        complete: () => {
          setLoading(false);
        },
      };
      const result = await AjaxHandler.getInstance().sendRequestAsync(ajaxConfig);
      return result;
    };

  const SelectMethod = async (filter?: Partial<filterItem>): Promise<any[]> => {
    const page = filter?.items?.["page"]?.value ?? 1; // Default to 1 if undefined
    const pageSize = filter?.items?.["pageSize"]?.value ?? 10; // Default to 10 if undefined  
    setLoading(true);
    const data = createFormData({
      email,
      token,
      page,
      pageSize,
      filterByColumns:JSON.stringify([
        {
          columnName: 'CreatedByUserId',
          filterValue: userId,
        }
      ]),
      orderByColumns: ['Id'],
    });

    const ajaxConfig: AjaxConfig = {
      url: `${domain}${_selectMethodAPI}`,
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
      success: (response: any) => {
        console.log('Records fetched successfully:', response);
      },
      error: (err: any) => console.error('Error fetching records:', err),
      complete: () => setLoading(false),
    };
    const result = await AjaxHandler.getInstance().sendRequestAsync(ajaxConfig);
    return result;
  };


  const SelectCountMethod = async (filter?: Partial<filterItem>): Promise<number> => {
    const ajaxConfig: AjaxConfig = {
      url: `${domain}${_selectCountMethodAPI}`,
      method: 'POST',
      data: new FormData(), // Using FormData for [FromForm]
      contentType: 'multipart/form-data',
      beforeSend: () => console.log('Fetching record count...'),
      success: (response: any) => {
        const count = parseInt(response.count || "0", 10);

        // Add fallback to avoid NaN
        const safeCount = isNaN(count) ? 0 : count;
        const safePageSize = isNaN(pageSize) || pageSize <= 0 ? 1 : pageSize;

        // Calculate pages
        const countPage: number = Math.ceil(safeCount / safePageSize);

        setTotalRecords(count);
        setTotalPages(countPage); // Calculate total pages
      },
      error: (err: any) => console.error('Failed to fetch record count:', err),
      complete: () => console.log('Fetch complete'),
    };

    // Add email and token to FormData
    const formData = ajaxConfig.data as FormData;
    formData.append('email', email);
    formData.append('token', token);
    const data = await AjaxHandler.getInstance().sendRequestAsync(ajaxConfig);
    return data.count;
  };


  return (
    <div>
      <ObjectDataSource
        CreateMethod={CreateMethod}
        CreateNewEntity={CreateNewEntity}
        SelectMethod={SelectMethod}
        UpdateMethod={UpdateMethod}
        DeleteMethod={DeleteMethod}
        SelectCountMethod={SelectCountMethod}
      >
        {(dataSource) => (
          <div className="flex flex-col flex-grow">
            <GridView appContent={appContent} dataSource={dataSource} datasource_columns={datasource_columns} />
          </div>
        )}
      </ObjectDataSource>
    </div>
  );
}

export default TranslationRecordWithSoundManagementComponent;

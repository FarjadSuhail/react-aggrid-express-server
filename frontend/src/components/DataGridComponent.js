import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const DataGridTable = ({ rowData, columnDefs }) => {
  const navigate = useNavigate();

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 500, width: "100%", marginTop: 20 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={[
          ...columnDefs,
          {
            headerName: "Actions",
            field: "actions",
            cellRenderer: (params) => (
              <div
                style={{ display: "flex", gap: 4, justifyContent: "center" }}
              >
                <Tooltip title="View Details">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/detail/${params.data.id}`)}
                    color="primary"
                    style={{ padding: 4 }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete (Not implemented)">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => alert("Delete not implemented")}
                    style={{ padding: 4 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            ),
            sortable: false,
            filter: false,
            resizable: false,
            width: 120,
            suppressSizeToFit: false,
          },
        ]}
        pagination
        paginationPageSize={10}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
};

export default DataGridTable;

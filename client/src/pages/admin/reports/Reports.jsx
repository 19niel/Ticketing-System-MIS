import { useState } from "react";
import { Search, UserPlus, Edit, Trash2, Download } from "lucide-react";

export default function Users() {

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 gap-2 py-2"> View Detailed Performances </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
   
  );
}

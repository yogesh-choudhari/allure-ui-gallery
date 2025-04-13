
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Edit, Trash2, GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ColumnType = {
  id: string;
  name: string;
  type: string;
};

type StatusOption = {
  id: string;
  label: string;
  color: string;
};

const COLUMN_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "status", label: "Status" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
];

const STATUS_COLORS = {
  blue: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
  purple: { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  green: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  red: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
};

const ColumnManager = ({ onClose }) => {
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState("text");
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "1", name: "Person LinkedIn", type: "url" },
    { id: "2", name: "Status", type: "status" },
  ]);
  
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([
    { id: "1", label: "New Lead", color: "blue" },
    { id: "2", label: "Contacted", color: "orange" },
    { id: "3", label: "Meeting Scheduled", color: "purple" },
    { id: "4", label: "Qualified", color: "green" },
  ]);
  
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  const [optionLabel, setOptionLabel] = useState("");
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [newOptionColor, setNewOptionColor] = useState("blue");
  const [addingOption, setAddingOption] = useState(false);

  const handleAddColumn = () => {
    if (!columnName.trim()) return;
    
    const newColumn = {
      id: Date.now().toString(),
      name: columnName,
      type: columnType,
    };
    
    setColumns([...columns, newColumn]);
    setColumnName("");
    setColumnType("text");
  };

  const handleRemoveColumn = (id: string) => {
    setColumns(columns.filter(column => column.id !== id));
  };
  
  const handleAddStatusOption = () => {
    if (!newOptionLabel.trim()) return;
    
    const newOption = {
      id: Date.now().toString(),
      label: newOptionLabel,
      color: newOptionColor,
    };
    
    setStatusOptions([...statusOptions, newOption]);
    setNewOptionLabel("");
    setNewOptionColor("blue");
    setAddingOption(false);
  };
  
  const handleRemoveStatusOption = (id: string) => {
    setStatusOptions(statusOptions.filter(option => option.id !== id));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <h2 className="text-xl font-bold">Manage Columns</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
            {/* Add Column Section */}
            <div className="p-6 bg-gray-50 border-b">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
                  <Input
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    placeholder="New column name"
                    className="w-full"
                  />
                  <Select value={columnType} onValueChange={setColumnType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLUMN_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddColumn}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Column
                </Button>
              </div>
            </div>

            {/* Columns List */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Current Columns</h3>
              <div className="space-y-4">
                {columns.map((column) => (
                  <motion.div
                    key={column.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mr-3 cursor-move text-gray-400">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{column.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {COLUMN_TYPES.find(t => t.value === column.type)?.label || column.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => handleRemoveColumn(column.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status Options */}
            {columns.some(col => col.type === "status") && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Status Options</h3>
                  <Button 
                    variant="outline" 
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    onClick={() => setAddingOption(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
                
                {/* Add New Status Option Form */}
                {addingOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-3 items-center">
                      <Input
                        value={newOptionLabel}
                        onChange={(e) => setNewOptionLabel(e.target.value)}
                        placeholder="Option label"
                        className="w-full"
                      />
                      <Select value={newOptionColor} onValueChange={setNewOptionColor}>
                        <SelectTrigger className="w-28">
                          <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(STATUS_COLORS).map((color) => (
                            <SelectItem key={color} value={color}>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[color].dot} mr-2`}></div>
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleAddStatusOption}
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button
                          onClick={() => setAddingOption(false)}
                          size="sm"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="space-y-3">
                  {statusOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div className="mr-3 cursor-move text-gray-400">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      
                      {editingOptionId === option.id ? (
                        <Input
                          value={optionLabel}
                          onChange={(e) => setOptionLabel(e.target.value)}
                          className="flex-1 mr-2"
                          autoFocus
                          onBlur={() => {
                            setStatusOptions(statusOptions.map(opt => 
                              opt.id === option.id ? { ...opt, label: optionLabel } : opt
                            ));
                            setEditingOptionId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setStatusOptions(statusOptions.map(opt => 
                                opt.id === option.id ? { ...opt, label: optionLabel } : opt
                              ));
                              setEditingOptionId(null);
                            }
                          }}
                        />
                      ) : (
                        <div 
                          className={cn(
                            "flex-1 flex items-center px-3 py-1.5 rounded-md",
                            STATUS_COLORS[option.color].bg,
                            STATUS_COLORS[option.color].text
                          )}
                        >
                          <div className={cn("w-2 h-2 rounded-full mr-2", STATUS_COLORS[option.color].dot)} />
                          {option.label}
                        </div>
                      )}
                      
                      <div className="flex space-x-2 ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setOptionLabel(option.label);
                            setEditingOptionId(option.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => handleRemoveStatusOption(option.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ColumnManager;

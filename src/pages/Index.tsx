
import { useState } from "react";
import ColumnManager from "@/components/ColumnManager";
import { motion } from "framer-motion";
import { ArrowRight, FileText, UserCheck, BarChart3 } from "lucide-react";

const Index = () => {
  const [showColumnManager, setShowColumnManager] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Allure UI Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Create and manage your workflow columns with our intuitive interface.
            Organize your data your way.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-indigo-500" />}
            title="Customizable Columns"
            description="Create and manage your own column structure to match your workflow."
          />
          <FeatureCard
            icon={<UserCheck className="h-8 w-8 text-purple-500" />}
            title="Status Tracking"
            description="Track lead status from initial contact to final conversion."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-pink-500" />}
            title="Visual Analytics"
            description="Get visual insights into your pipeline and performance metrics."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setShowColumnManager(true)}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:opacity-100"></span>
            <span className="relative flex items-center">
              Manage Columns
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>

      {showColumnManager && (
        <ColumnManager onClose={() => setShowColumnManager(false)} />
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="relative group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Index;

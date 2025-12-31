import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function DepartmentList() {
  const { isAdminOrHR } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await departmentAPI.getAll();
      setDepartments(response.data.data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    try {
      await departmentAPI.delete(id);
      setDepartments(departments.filter(dept => dept.id !== id));
      alert('Department deleted successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting department');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading departments...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-600 mt-1">Manage organizational departments</p>
        </div>
        {isAdminOrHR() && (
          <Link to="/departments/add" className="btn-primary">
            ➕ Add Department
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{dept.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{dept.description || 'No description'}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-2xl">
                🏢
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Employees:</span>
                <span className="font-semibold text-gray-800">
                  {dept.employees?.length || 0}
                </span>
              </div>
            </div>

            {isAdminOrHR() && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No departments found
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentAPI, roleAPI } from '../../services/api';

export default function AddDepartment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('department');
  const [departmentData, setDepartmentData] = useState({
    name: '',
    description: ''
  });
  const [roleData, setRoleData] = useState({
    title: '',
    description: ''
  });

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await departmentAPI.create(departmentData);
      alert('Department created successfully!');
      navigate('/departments');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating department');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await roleAPI.create(roleData);
      alert('Role created successfully!');
      setRoleData({ title: '', description: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add Department or Role</h1>
        <p className="text-gray-600 mt-1">Create new departments and roles for your organization</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('department')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'department'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Department
            </button>
            <button
              onClick={() => setActiveTab('role')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'role'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Role
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'department' ? (
            <form onSubmit={handleDepartmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={departmentData.name}
                  onChange={(e) => setDepartmentData({ ...departmentData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={departmentData.description}
                  onChange={(e) => setDepartmentData({ ...departmentData, description: e.target.value })}
                  className="input-field"
                  rows="4"
                  placeholder="Enter department description..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/departments')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Creating...' : 'Create Department'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  value={roleData.title}
                  onChange={(e) => setRoleData({ ...roleData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={roleData.description}
                  onChange={(e) => setRoleData({ ...roleData, description: e.target.value })}
                  className="input-field"
                  rows="4"
                  placeholder="Enter role description..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Creating...' : 'Create Role'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

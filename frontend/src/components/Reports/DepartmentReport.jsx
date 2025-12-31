import { useState, useEffect } from 'react';
import { reportAPI } from '../../services/api';

export default function DepartmentReport() {
  const [report, setReport] = useState([]);
  const [salaryReport, setSalaryReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('department');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [deptRes, salaryRes] = await Promise.all([
        reportAPI.getDepartmentReport(),
        reportAPI.getSalaryReport()
      ]);
      setReport(deptRes.data.data.report);
      setSalaryReport(salaryRes.data.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading reports...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600 mt-1">View comprehensive reports and analytics</p>
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
              Department Report
            </button>
            <button
              onClick={() => setActiveTab('salary')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'salary'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Salary Report
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'department' ? (
            <div className="space-y-6">
              {report.map((dept) => (
                <div key={dept.departmentId} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{dept.departmentName}</h3>
                    <div className="flex space-x-4 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600">Total</div>
                        <div className="font-bold text-primary-600">{dept.totalEmployees}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Active</div>
                        <div className="font-bold text-green-600">{dept.activeEmployees}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Total Salary</div>
                        <div className="font-bold text-blue-600">${dept.totalSalary.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {dept.employees.length > 0 && (
                    <div className="mt-4">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Role</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Salary</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {dept.employees.map((emp, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm text-gray-800">{emp.name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{emp.email}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{emp.role}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">${emp.salary}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  emp.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {emp.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-blue-600 text-sm font-medium">Total Payroll</div>
                  <div className="text-2xl font-bold text-blue-800 mt-1">
                    ${salaryReport?.statistics.total.toFixed(2)}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-600 text-sm font-medium">Average Salary</div>
                  <div className="text-2xl font-bold text-green-800 mt-1">
                    ${salaryReport?.statistics.average.toFixed(2)}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-purple-600 text-sm font-medium">Highest Salary</div>
                  <div className="text-2xl font-bold text-purple-800 mt-1">
                    ${salaryReport?.statistics.highest.toFixed(2)}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-yellow-600 text-sm font-medium">Lowest Salary</div>
                  <div className="text-2xl font-bold text-yellow-800 mt-1">
                    ${salaryReport?.statistics.lowest.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {salaryReport?.salaries.map((sal, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{sal.employeeName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{sal.department}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{sal.role}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                          ${parseFloat(sal.amount).toFixed(2)} {sal.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
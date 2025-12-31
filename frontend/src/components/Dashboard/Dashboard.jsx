import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI, departmentAPI, reportAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { isAdminOrHR } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalDepartments: 0,
    averageSalary: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [employeesRes, departmentsRes] = await Promise.all([
        employeeAPI.getAll(),
        departmentAPI.getAll()
      ]);

      const employees = employeesRes.data.data.employees;
      const departments = departmentsRes.data.data.departments;

      const activeEmp = employees.filter(e => e.status === 'active').length;
      const avgSalary = employees.reduce((sum, e) => {
        return sum + (e.salary ? parseFloat(e.salary.amount) : 0);
      }, 0) / employees.length;

      setStats({
        totalEmployees: employees.length,
        activeEmployees: activeEmp,
        totalDepartments: departments.length,
        averageSalary: avgSalary || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees,
      icon: '✅',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Departments',
      value: stats.totalDepartments,
      icon: '🏢',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Avg Salary',
      value: `$${stats.averageSalary.toFixed(0)}`,
      icon: '💰',
      color: 'bg-yellow-50 text-yellow-600'
    }
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your employee management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {isAdminOrHR() && (
              <>
                <Link
                  to="/employees/add"
                  className="block w-full px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-center font-medium"
                >
                  ➕ Add New Employee
                </Link>
                <Link
                  to="/departments/add"
                  className="block w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
                >
                  🏢 Add New Department
                </Link>
              </>
            )}
            <Link
              to="/employees"
              className="block w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center font-medium"
            >
              📋 View All Employees
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <span className="text-2xl">📊</span>
              <span className="text-sm">{stats.totalEmployees} employees in system</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <span className="text-2xl">🏢</span>
              <span className="text-sm">{stats.totalDepartments} active departments</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <span className="text-2xl">✅</span>
              <span className="text-sm">{stats.activeEmployees} employees active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
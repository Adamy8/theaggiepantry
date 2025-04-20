import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  X, 
  Check, 
  Calendar,
  Mail,
  Phone,
  Clock
} from 'lucide-react';
import { Volunteer } from '../../types';
import { format } from 'date-fns';

const VolunteerPage: React.FC = () => {
  const { volunteers, addVolunteer, updateVolunteer, deleteVolunteer } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  
  const [newVolunteer, setNewVolunteer] = useState<Omit<Volunteer, 'id'>>({
    name: '',
    email: '',
    phone: '',
    shift: '',
    position: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    active: true,
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    if (editingVolunteer) {
      setEditingVolunteer({
        ...editingVolunteer,
        [field]: e.target.value,
      });
    } else {
      setNewVolunteer({
        ...newVolunteer,
        [field]: e.target.value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVolunteer) {
      updateVolunteer(editingVolunteer.id, editingVolunteer);
      setEditingVolunteer(null);
    } else {
      addVolunteer(newVolunteer);
      setNewVolunteer({
        name: '',
        email: '',
        phone: '',
        shift: '',
        position: '',
        startDate: format(new Date(), 'yyyy-MM-dd'),
        active: true,
      });
    }
    
    setShowAddModal(false);
  };
  
  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setShowAddModal(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this volunteer?')) {
      deleteVolunteer(id);
    }
  };
  
  const handleStatusToggle = (id: string, currentStatus: boolean) => {
    updateVolunteer(id, { active: !currentStatus });
  };
  
  const filteredVolunteers = volunteers
    .filter(volunteer => showInactive ? true : volunteer.active)
    .filter(volunteer =>
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const positions = ['Stock Clerk', 'Greeter', 'Inventory Manager', 'Coordinator', 'Driver'];
  
  const shifts = [
    'Monday 9am-12pm',
    'Monday 1pm-4pm',
    'Tuesday 9am-12pm',
    'Tuesday 2pm-5pm',
    'Wednesday 9am-12pm',
    'Wednesday 1pm-4pm',
    'Thursday 9am-12pm',
    'Thursday 2pm-5pm',
    'Friday 9am-12pm',
    'Friday 1pm-4pm',
    'Saturday 10am-1pm',
    'Sunday 10am-1pm'
  ];
  
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Volunteer Management</h1>
            <p className="text-neutral-600">Manage volunteers and their shifts</p>
          </div>
          
          <button
            onClick={() => {
              setEditingVolunteer(null);
              setShowAddModal(true);
            }}
            className="btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Volunteer
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search volunteers..."
                className="w-full py-2 px-4 pl-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              />
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={() => setShowInactive(!showInactive)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${
                  showInactive ? 'bg-primary' : 'bg-neutral-300'
                }`}>
                  <div className={`transform transition-transform w-5 h-5 rounded-full bg-white shadow-md ${
                    showInactive ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </div>
                <span className="ml-2 text-sm text-neutral-700">Show inactive volunteers</span>
              </label>
            </div>
          </div>
          
          {filteredVolunteers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Volunteer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Shift
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredVolunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-medium">
                              {volunteer.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">
                              {volunteer.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">
                          {volunteer.email}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {volunteer.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {volunteer.shift}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {volunteer.position}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {new Date(volunteer.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusToggle(volunteer.id, volunteer.active)}
                          className={`px-3 py-1 inline-flex items-center text-xs rounded-full font-semibold ${
                            volunteer.active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                          }`}
                        >
                          {volunteer.active ? (
                            <>
                              <Check size={12} className="mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <X size={12} className="mr-1" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(volunteer)}
                          className="text-primary hover:text-primary-blue mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(volunteer.id)}
                          className="text-accent-red hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-700 mb-1">No volunteers found</h3>
              <p className="text-neutral-500 mb-4">Try adjusting your search or add a new volunteer.</p>
              <button
                onClick={() => {
                  setEditingVolunteer(null);
                  setShowAddModal(true);
                }}
                className="btn btn-primary"
              >
                Add Volunteer
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Volunteer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-200 px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingVolunteer(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVolunteer ? editingVolunteer.name : newVolunteer.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={editingVolunteer ? editingVolunteer.email : newVolunteer.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="email@example.com"
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={editingVolunteer ? editingVolunteer.phone : newVolunteer.phone}
                      onChange={(e) => handleInputChange(e, 'phone')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="555-123-4567"
                    />
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Position
                  </label>
                  <select
                    required
                    value={editingVolunteer ? editingVolunteer.position : newVolunteer.position}
                    onChange={(e) => handleInputChange(e, 'position')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shift
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={editingVolunteer ? editingVolunteer.shift : newVolunteer.shift}
                      onChange={(e) => handleInputChange(e, 'shift')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a shift</option>
                      {shifts.map((shift) => (
                        <option key={shift} value={shift}>
                          {shift}
                        </option>
                      ))}
                    </select>
                    <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={editingVolunteer ? editingVolunteer.startDate : newVolunteer.startDate}
                      onChange={(e) => handleInputChange(e, 'startDate')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                  <select
                    required
                    value={(editingVolunteer ? editingVolunteer.active : newVolunteer.active) ? 'true' : 'false'}
                    onChange={(e) => {
                      const value = e.target.value === 'true';
                      if (editingVolunteer) {
                        setEditingVolunteer({
                          ...editingVolunteer,
                          active: value,
                        });
                      } else {
                        setNewVolunteer({
                          ...newVolunteer,
                          active: value,
                        });
                      }
                    }}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingVolunteer(null);
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-blue"
                >
                  {editingVolunteer ? 'Update Volunteer' : 'Add Volunteer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerPage;
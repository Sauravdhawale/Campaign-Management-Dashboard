import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { CampaignTable } from "@/components/CampaignTable";
import { AddCampaignModal } from "@/components/AddCampaignModal";
import { EditCampaignModal } from "@/components/EditCampaignModal";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Campaign {
  id: number;
  accountManager: string;
  status: string;
  projectId: string;
  campaignType: string;
  campaignName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  allocation: number;
  leadsDelivered: number;
  leadsPending: number;
  pacing: string;
}

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

useEffect(() => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    navigate('/');
    return;
  }

  const parsedUser = JSON.parse(userData);
  setUser(parsedUser);

  loadCampaigns(); // ✅ Now this works because it's defined below
}, [navigate]);

// ✅ Define the function BELOW useEffect, not above or outside
const loadCampaigns = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fetch_campaigns.php`);
    const data = await response.json();

    console.log("Raw backend campaigns data:", data); // keep this

    const formatted = data.map((c: any) => ({
      id: c.id,
      accountManager: c.account_manager,
      status: c.status,
      projectId: c.project_id,
      campaignType: c.campaign_type,
      campaignName: c.campaign_name,
      clientName: c.client_name,
      startDate: c.start_date,
      endDate: c.end_date,
      allocation: c.allocation,
      leadsDelivered: c.leads_delivered,
      leadsPending: c.leads_pending,
      pacing: c.pacing,
    }));

    setCampaigns(formatted); // ✅ fixes the table UI
  } catch (error) {
    console.error("Failed to load campaigns:", error);
    toast.error("Unable to fetch campaign data");
  }
};


const handleLogout = () => {
  localStorage.removeItem('user');
  toast.success('Logged out successfully');
  navigate('/');
};

const handleAddCampaign = async (newCampaign: Omit<Campaign, 'id'>) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/add_campaign.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCampaign)
    });

    const result = await response.json();
    if (result.success) {
      toast.success("Campaign added successfully");
      setIsAddModalOpen(false);
      loadCampaigns(); // reloads from DB
    } else {
      toast.error(result.error || "Failed to add campaign");
    }
  } catch (error) {
    console.error("Add campaign error:", error);
    toast.error("An error occurred while adding campaign");
  }
};

const handleEditCampaign = async (updatedCampaign: Campaign) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/edit_campaign.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCampaign),
    });

    const result = await response.json();
    console.log("Edit API response:", result); // 🧪 Add this line

    if (result.success) {
      toast.success("Campaign updated successfully");
      setIsEditModalOpen(false);
      setEditingCampaign(null);
      loadCampaigns();
    } else {
      toast.error(result.error || "Failed to update campaign");
    }
  } catch (error) {
    console.error("Edit campaign error:", error); // 🔍 Check browser console
    toast.error("An error occurred while updating campaign");
  }
};

const handleDeleteCampaign = async (id: number) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete_campaign.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Campaign deleted successfully");
      loadCampaigns(); // Refresh the list
    } else {
      toast.error(result.message || "Failed to delete campaign");
    }
  } catch (error) {
    console.error("Delete campaign error:", error);
    toast.error("An error occurred while deleting campaign");
  }
};


  const openEditModal = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsEditModalOpen(true);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-between relative">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="" style={{width:"85%", position:"absolute", right:"0%"}}>
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              {/* <h1 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your marketing campaigns</p> */}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} className="px-3 py-1">
                {user.role}
              </Badge>
              <span className="text-gray-700">Welcome, {user.name}</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            {/* <h2 className="text-xl font-semibold text-gray-900 mb-2">Pending Campaigns</h2>
            <p className="text-gray-600 text-sm">Track and manage your ongoing campaign activity.</p> */}
            <h1 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your marketing campaigns</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Campaign Management</CardTitle>
                {user.role === 'Admin' && (
                  <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#B71C1C] hover:bg-[#9A1515]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Campaign
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CampaignTable 
                campaigns={campaigns}
                isAdmin={user.role === 'Admin'}
                onEdit={openEditModal}
                onDelete={handleDeleteCampaign}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      <AddCampaignModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCampaign}
      />

      <EditCampaignModal 
        isOpen={isEditModalOpen}
        campaign={editingCampaign}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCampaign(null);
        }}
        onEdit={handleEditCampaign}
      />
    </div>
  );
};

export default Dashboard;

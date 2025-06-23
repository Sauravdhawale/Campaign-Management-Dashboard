
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Campaign {
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

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (campaign: Campaign) => void;
}

export const AddCampaignModal: React.FC<AddCampaignModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState<Campaign>({
    accountManager: '',
    status: 'Active',
    projectId: '',
    campaignType: '',
    campaignName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    allocation: 0,
    leadsDelivered: 0,
    leadsPending: 0,
    pacing: 'On Track'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      accountManager: '',
      status: 'Active',
      projectId: '',
      campaignType: '',
      campaignName: '',
      clientName: '',
      startDate: '',
      endDate: '',
      allocation: 0,
      leadsDelivered: 0,
      leadsPending: 0,
      pacing: 'On Track'
    });
  };

  const handleChange = (field: keyof Campaign, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Campaign</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountManager">Account Manager</Label>
              <Input
                id="accountManager"
                value={formData.accountManager}
                onChange={(e) => handleChange('accountManager', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectId">Project ID</Label>
              <Input
                id="projectId"
                value={formData.projectId}
                onChange={(e) => handleChange('projectId', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="campaignType">Campaign Type</Label>
              {/* <Select value={formData.campaignType} onValueChange={(value) => handleChange('campaignType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="PPC">PPC</SelectItem>
                  <SelectItem value="Content Marketing">Content Marketing</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
                id="campaignType"
                value={formData.campaignType}
                onChange={(e) => handleChange('campaignType', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={formData.campaignName}
                onChange={(e) => handleChange('campaignName', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleChange('clientName', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="allocation">Allocation ($)</Label>
              <Input
                id="allocation"
                type="number"
                value={formData.allocation}
                onChange={(e) => handleChange('allocation', parseInt(e.target.value))}
                required
              />
            </div>

            <div>
              <Label htmlFor="leadsDelivered">Leads Delivered</Label>
              <Input
                id="leadsDelivered"
                type="number"
                value={formData.leadsDelivered}
                onChange={(e) => handleChange('leadsDelivered', parseInt(e.target.value))}
                required
              />
            </div>

            <div>
              <Label htmlFor="leadsPending">Leads Pending</Label>
              <Input
                id="leadsPending"
                type="number"
                value={formData.leadsPending}
                onChange={(e) => handleChange('leadsPending', parseInt(e.target.value) )}
                required
              />
            </div>

            <div>
              <Label htmlFor="pacing">Pacing</Label>
              <Select value={formData.pacing} onValueChange={(value) => handleChange('pacing', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On Track">On Track</SelectItem>
                  <SelectItem value="Behind">Behind</SelectItem>
                  <SelectItem value="Ahead">Ahead</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#B71C1C] hover:bg-[#9A1515]">
              Add Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

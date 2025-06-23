
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface CampaignTableProps {
  campaigns: Campaign[];
  isAdmin: boolean;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  isAdmin,
  onEdit,
  onDelete
}) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Paused': 'secondary',
      'Completed': 'outline'
    } as const;
    
    const colors = {
      'Active': 'bg-green-100 text-green-800 hover:bg-green-100',
      'Paused': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      'Completed': 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    };

    return (
      <Badge 
        variant={variants[status as keyof typeof variants] || 'outline'}
        className={colors[status as keyof typeof colors] || ''}
      >
        {status}
      </Badge>
    );
  };

  const getPacingBadge = (pacing: string) => {
    const colors = {
      'On Track': 'bg-green-100 text-green-800 hover:bg-green-100',
      'Behind': 'bg-red-100 text-red-800 hover:bg-red-100',
      'Ahead': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      'Completed': 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    };

    return (
      <Badge 
        variant="outline"
        className={colors[pacing as keyof typeof colors] || ''}
      >
        {pacing}
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left p-3 font-medium text-gray-900 text-xs">S. No</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Account Manager</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Status</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Project ID</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Campaign Type</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Campaign Name</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Client Name</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Start Date</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">End Date</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Allocation</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Leads Delivered</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Leads Pending</th>
            <th className="text-left p-3 font-medium text-gray-900 text-xs">Pacing</th>
            {isAdmin && <th className="text-left p-3 font-medium text-gray-900 text-xs">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3 text-gray-900 text-xs">{index + 1}</td>
              <td className="p-3 text-gray-900 text-xs break-words">{campaign.accountManager}</td>
              <td className="p-3">{getStatusBadge(campaign.status)}</td>
              <td className="p-3 text-gray-900 text-xs break-words">{campaign.projectId}</td>
              <td className="p-3 text-gray-900 text-xs break-words">{campaign.campaignType}</td>
              <td className="p-3 text-gray-900 font-medium text-xs break-words">{campaign.campaignName}</td>
              <td className="p-3 text-gray-900 text-xs break-words">{campaign.clientName}</td>
              <td className="p-3 text-gray-900 text-xs">{new Date(campaign.startDate).toLocaleDateString()}</td>
              <td className="p-3 text-gray-900 text-xs">{new Date(campaign.endDate).toLocaleDateString()}</td>
              <td className="p-3 text-gray-900 text-xs">${campaign.allocation.toLocaleString()}</td>
              <td className="p-3 text-gray-900 text-xs">{campaign.leadsDelivered}</td>
              <td className="p-3 text-gray-900 text-xs">{campaign.leadsPending}</td>
              <td className="p-3">{getPacingBadge(campaign.pacing)}</td>
              {isAdmin && (
                <td className="p-3">
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(campaign)}
                      className="hover:bg-blue-50 hover:border-blue-300 h-7 w-7 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{campaign.campaignName}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(campaign.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

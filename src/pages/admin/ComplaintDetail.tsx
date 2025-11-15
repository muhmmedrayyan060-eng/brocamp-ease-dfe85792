import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge";

const ComplaintDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("In Progress");
  const [comment, setComment] = useState("");

  // Mock data
  const complaint = {
    id: id || "CMP001",
    student: "Ameer Ali",
    title: "Wi-Fi not working in lab",
    description: "The Wi-Fi in the first floor lab has been down since this morning. Unable to access internet for assignments and research work.",
    category: "Technical",
    status: "In Progress",
    created_at: "2025-11-10T09:30:00Z",
    updated_at: "2025-11-10T11:00:00Z",
  };

  const handleUpdate = () => {
    if (!comment && status !== complaint.status) {
      toast.error("Please add a comment when updating status");
      return;
    }

    toast.success("Complaint updated successfully!");
    navigate("/admin/dashboard");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <img src={logo} alt="Brototype" className="h-12" />
            <span className="text-2xl font-bold text-foreground tracking-tight">BrocampSupport</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">Complaint Details</h1>
            <Badge variant="outline" className={getStatusColor(complaint.status)}>
              {complaint.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">ID: {complaint.id}</p>
        </div>

        <div className="space-y-6">
          {/* Complaint Info */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{complaint.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="text-sm">Student: <span className="text-foreground font-medium">{complaint.student}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="w-4 h-4" />
                <span className="text-sm">Category: <span className="text-foreground font-medium">{complaint.category}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Created: <span className="text-foreground font-medium">{new Date(complaint.created_at).toLocaleDateString()}</span></span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <p className="text-muted-foreground bg-secondary p-4 rounded-lg">
                {complaint.description}
              </p>
            </div>
          </Card>

          {/* Admin Actions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Update Complaint</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Admin Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Add notes or resolution details..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleUpdate}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  size="lg"
                >
                  Update Complaint
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/dashboard")}
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ComplaintDetail;

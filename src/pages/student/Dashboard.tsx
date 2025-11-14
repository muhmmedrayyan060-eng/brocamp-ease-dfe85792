import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, LogOut, MessageSquare, Clock, CheckCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const mockComplaints = [
  {
    id: "CMP001",
    title: "Wi-Fi not working in lab",
    category: "Technical",
    status: "In Progress",
    created_at: "2025-11-10",
  },
  {
    id: "CMP002",
    title: "AC not cooling properly",
    category: "Facilities",
    status: "Resolved",
    created_at: "2025-11-08",
  },
  {
    id: "CMP003",
    title: "Projector issue in classroom",
    category: "Technical",
    status: "Pending",
    created_at: "2025-11-11",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, complaintId: string, status: string) => {
    e.stopPropagation();
    if (status !== "Pending") {
      toast.error("Only pending complaints can be deleted");
      return;
    }
    setComplaintToDelete(complaintId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (complaintToDelete) {
      setComplaints(complaints.filter(c => c.id !== complaintToDelete));
      toast.success("Complaint deleted successfully");
      setComplaintToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "In Progress":
        return <MessageSquare className="w-4 h-4" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Brototype" className="h-12" />
            <span className="text-2xl font-bold text-foreground tracking-tight">BrocampSupport</span>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Complaints</h1>
            <p className="text-muted-foreground">
              Track and manage your submitted complaints
            </p>
          </div>
          <Button
            onClick={() => navigate("/student/new-complaint")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Complaint
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total</p>
                <p className="text-3xl font-bold">{complaints.length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold">
                  {complaints.filter((c) => c.status === "Pending").length}
                </p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Resolved</p>
                <p className="text-3xl font-bold">
                  {complaints.filter((c) => c.status === "Resolved").length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/student/complaint/${complaint.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{complaint.title}</h3>
                    <Badge variant="outline" className={getStatusColor(complaint.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>ID: {complaint.id}</span>
                    <span>•</span>
                    <span>Category: {complaint.category}</span>
                    <span>•</span>
                    <span>{complaint.created_at}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/complaint/${complaint.id}`);
                    }}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Button>
                  {complaint.status === "Pending" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteClick(e, complaint.id, complaint.status)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this complaint? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, MessageSquare, Clock, CheckCircle, Filter, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const mockComplaints = [
  {
    id: "CMP001",
    student: "Ameer Ali",
    title: "Wi-Fi not working in lab",
    category: "Technical",
    status: "In Progress",
    created_at: "2025-11-10",
  },
  {
    id: "CMP002",
    student: "Rahul Kumar",
    title: "AC not cooling properly",
    category: "Facilities",
    status: "Resolved",
    created_at: "2025-11-08",
  },
  {
    id: "CMP003",
    student: "Priya Singh",
    title: "Projector issue in classroom",
    category: "Technical",
    status: "Pending",
    created_at: "2025-11-11",
  },
  {
    id: "CMP004",
    student: "Arjun Nair",
    title: "Water cooler not working",
    category: "Facilities",
    status: "Pending",
    created_at: "2025-11-11",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleResolve = (complaintId: string) => {
    setComplaints(
      complaints.map((c) =>
        c.id === complaintId ? { ...c, status: "Resolved" } : c
      )
    );
    toast.success("Complaint resolved! OTP sent to student via SMS/Email.");
  };

  const handleStatusChange = (complaintId: string, newStatus: string) => {
    setComplaints(
      complaints.map((c) =>
        c.id === complaintId ? { ...c, status: newStatus } : c
      )
    );
    toast.success(`Status updated to ${newStatus}! OTP notification sent to student.`);
  };

  const filteredComplaints = statusFilter === "all" 
    ? complaints 
    : complaints.filter(c => c.status === statusFilter);

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
            <Badge className="bg-accent text-accent-foreground">Admin</Badge>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and resolve student complaints
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-muted-foreground text-sm mb-1">In Progress</p>
                <p className="text-3xl font-bold">
                  {complaints.filter((c) => c.status === "In Progress").length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500" />
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

        {/* Filter Section */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Complaints</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/admin/complaint/${complaint.id}`)}
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
                    <span className="font-medium">Student: {complaint.student}</span>
                    <span>•</span>
                    <span>ID: {complaint.id}</span>
                    <span>•</span>
                    <span>Category: {complaint.category}</span>
                    <span>•</span>
                    <span>{complaint.created_at}</span>
                  </div>
                </div>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={complaint.status}
                    onValueChange={(value) => handleStatusChange(complaint.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="In Progress">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          In Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="Resolved">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Resolved
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/complaint/${complaint.id}/chat`)}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

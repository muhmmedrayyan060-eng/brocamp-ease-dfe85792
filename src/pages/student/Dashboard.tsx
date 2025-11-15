import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, LogOut, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge";

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
  const [complaints] = useState(mockComplaints);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={logo} alt="Brototype" className="h-12" />
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
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

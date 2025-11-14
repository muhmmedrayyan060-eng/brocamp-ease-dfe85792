import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

interface Message {
  id: string;
  sender: "student" | "admin";
  text: string;
  timestamp: Date;
}

const ComplaintChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "student",
      text: "The wifi in the lab is not working properly",
      timestamp: new Date("2025-01-10T10:00:00"),
    },
    {
      id: "2",
      sender: "admin",
      text: "Thank you for reporting. We are looking into this issue.",
      timestamp: new Date("2025-01-10T10:15:00"),
    },
  ]);

  // Mock complaint data
  const complaint = {
    id: id || "1",
    title: "WiFi Issue in Lab",
    status: "in_progress",
    category: "Technical",
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "student",
        text: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/student/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{complaint.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{complaint.category}</Badge>
                <Badge
                  variant={
                    complaint.status === "resolved"
                      ? "default"
                      : complaint.status === "in_progress"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {complaint.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Card className="h-[calc(100vh-300px)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "student"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ComplaintChat;

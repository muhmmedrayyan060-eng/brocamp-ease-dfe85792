import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Mic, MicOff, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  { id: "CAT01", name: "Technical" },
  { id: "CAT02", name: "Facilities" },
  { id: "CAT03", name: "Administrative" },
  { id: "CAT04", name: "Food & Canteen" },
  { id: "CAT05", name: "Other" },
];

const NewComplaint = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [studentName, setStudentName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
      toast.success("Recording stopped");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !studentName || !idNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    // Simulate complaint submission and generate ID
    const newComplaintId = "CMP" + Math.floor(Math.random() * 9000 + 1000);
    setComplaintId(newComplaintId);
    toast.success("Complaint submitted successfully!");
    setSuccessDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/student/dashboard")}
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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Submit New Complaint</h1>
          <p className="text-muted-foreground">
            Describe your issue and we'll work to resolve it
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  placeholder="Enter your full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  placeholder="Enter your ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Complaint Title *</Label>
              <Input
                id="title"
                placeholder="Brief summary of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about your complaint..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Upload Photo (Optional)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                {photo && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setPhoto(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {photo && (
                <p className="text-sm text-muted-foreground">
                  Selected: {photo.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Voice Recording (Optional)</Label>
              <div className="flex items-center gap-4">
                {!isRecording ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={startRecording}
                    className="flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={stopRecording}
                    className="flex items-center gap-2"
                  >
                    <MicOff className="w-4 h-4" />
                    Stop Recording
                  </Button>
                )}
                {audioBlob && !isRecording && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setAudioBlob(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {audioBlob && (
                <p className="text-sm text-muted-foreground">
                  Recording saved ({(audioBlob.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                size="lg"
              >
                Submit Complaint
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/student/dashboard")}
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Complaint Submitted!</DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p>Your complaint has been successfully submitted.</p>
              <p className="font-semibold text-foreground">Complaint ID: {complaintId}</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button
              onClick={() => navigate(`/student/complaint/${complaintId}`)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              View Complaint
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSuccessDialogOpen(false);
                setTitle("");
                setDescription("");
                setCategory("");
                setStudentName("");
                setIdNumber("");
                setPhoto(null);
                setAudioBlob(null);
              }}
              className="w-full"
            >
              Submit Another
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewComplaint;

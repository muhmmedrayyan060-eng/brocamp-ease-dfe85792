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
import { ArrowLeft, Upload, Mic, StopCircle, Image as ImageIcon } from "lucide-react";
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
  "Technical",
  "Facilities",
  "Academic",
  "Administrative",
  "Other",
];

const NewComplaint = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Photo uploaded successfully");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        toast.success("Voice recording completed");
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      toast.info("Recording started...");
    } catch (error) {
      toast.error("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (!title || !category || !description || !phoneNumber || !studentName || !idNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate complaint submission
    const newComplaintId = `CMP${Math.floor(1000 + Math.random() * 9000)}`;
    setComplaintId(newComplaintId);
    toast.success("Complaint submitted successfully! ID: " + newComplaintId);
    setSuccessDialogOpen(true);
    
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setPhoneNumber("");
    setStudentName("");
    setIdNumber("");
    setPhoto(null);
    setPhotoPreview("");
    setAudioBlob(null);
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
          <form className="space-y-6">
            {/* Student Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Student Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">Student ID *</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter your ID number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Complaint Details */}
            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
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
                  rows={6}
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">Attachments (Optional)</h2>
              
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo")?.click()}
                    className="w-full"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {photo ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
                {photoPreview && (
                  <div className="mt-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Voice Recording */}
              <div className="space-y-2">
                <Label>Voice Recording</Label>
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={startRecording}
                      className="w-full"
                      disabled={!!audioBlob}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      {audioBlob ? "Recording Saved" : "Start Recording"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={stopRecording}
                      className="w-full"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop Recording
                    </Button>
                  )}
                </div>
                {audioBlob && (
                  <p className="text-sm text-muted-foreground">
                    Voice recording captured successfully
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleSubmit}
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

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complaint Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Your complaint has been registered with ID: <strong>{complaintId}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              onClick={() => {
                setSuccessDialogOpen(false);
                navigate(`/student/complaint/${complaintId}`);
              }}
              variant="outline"
            >
              View Complaint
            </Button>
            <Button
              onClick={() => {
                setSuccessDialogOpen(false);
                navigate("/student/dashboard");
              }}
              className="bg-accent hover:bg-accent/90"
            >
              Back to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewComplaint;

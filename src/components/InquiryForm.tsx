import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InquiryFormProps {
  productId?: string;
  productName?: string;
  onSuccess?: () => void;
}

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const InquiryForm = ({ productId, productName, onSuccess }: InquiryFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [rxFile, setRxFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    first_name: "", last_name: "", phone: "", address: "",
    medicare_id: "", dob_month: "", dob_day: "", dob_year: "",
    zip_code: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeyPot, setHoneyPot] = useState("");
  const [loadedAt] = useState(Date.now());

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim()) e.last_name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^[\d\s()+-]{7,20}$/.test(form.phone.trim())) e.phone = "Invalid phone number";
    if (!form.address.trim()) e.address = "Required";
    if (!form.medicare_id.trim()) e.medicare_id = "Required";

    const month = parseInt(form.dob_month);
    const day = parseInt(form.dob_day);
    const year = parseInt(form.dob_year);
    if (!form.dob_month || isNaN(month) || month < 1 || month > 12) e.dob_month = "1–12";
    if (!form.dob_day || isNaN(day) || day < 1 || day > 31) e.dob_day = "1–31";
    if (!form.dob_year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) e.dob_year = "Invalid year";

    if (!form.zip_code.trim()) e.zip_code = "Required";
    else if (!/^\d{5}(-\d{4})?$/.test(form.zip_code.trim())) e.zip_code = "Invalid ZIP";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeyPot) return;
    if (Date.now() - loadedAt < 2000) {
      toast({ title: "Please wait", description: "Form submitted too quickly.", variant: "destructive" });
      return;
    }
    if (!validate()) return;
    setLoading(true);

    // Upload prescription file if provided
    let prescriptionUrl: string | null = null;
    if (rxFile) {
      const fileExt = rxFile.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("prescriptions")
        .upload(filePath, rxFile, { contentType: rxFile.type });

      if (uploadError) {
        toast({ title: "Upload Error", description: "Failed to upload prescription file.", variant: "destructive" });
        setLoading(false);
        return;
      }
      prescriptionUrl = filePath;
    }

    const { error } = await supabase.from("inquiries").insert({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      medicare_id: form.medicare_id.trim(),
      dob_month: parseInt(form.dob_month),
      dob_day: parseInt(form.dob_day),
      dob_year: parseInt(form.dob_year),
      zip_code: form.zip_code.trim(),
      message: form.message.trim() || null,
      product_id: productId || null,
      product_name: productName || null,
      prescription_url: prescriptionUrl,
    } as any);

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Inquiry Submitted!", description: "We'll be in touch soon." });
    setForm({ first_name: "", last_name: "", phone: "", address: "", medicare_id: "", dob_month: "", dob_day: "", dob_year: "", zip_code: "", message: "" });
    setRxFile(null);
    onSuccess?.();
  };

  const inputClass = (key: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:ring-1 ${
      errors[key] ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border focus:border-primary focus:ring-primary"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" value={honeyPot} onChange={(e) => setHoneyPot(e.target.value)} />
      </div>

      {productName && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
          <p className="text-sm text-muted-foreground">Inquiring about:</p>
          <p className="font-display font-semibold text-foreground">{productName}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
          <input type="text" placeholder="First Name" maxLength={100} value={form.first_name} onChange={(e) => handleChange("first_name", e.target.value)} className={inputClass("first_name")} />
          {errors.first_name && <p className="mt-1 text-xs text-destructive">{errors.first_name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
          <input type="text" placeholder="Last Name" maxLength={100} value={form.last_name} onChange={(e) => handleChange("last_name", e.target.value)} className={inputClass("last_name")} />
          {errors.last_name && <p className="mt-1 text-xs text-destructive">{errors.last_name}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
        <input type="tel" placeholder="Phone Number" maxLength={20} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClass("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Address</label>
        <input type="text" placeholder="Address" maxLength={200} value={form.address} onChange={(e) => handleChange("address", e.target.value)} className={inputClass("address")} />
        {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Medicare ID</label>
        <input type="text" placeholder="Medicare ID" maxLength={50} value={form.medicare_id} onChange={(e) => handleChange("medicare_id", e.target.value)} className={inputClass("medicare_id")} />
        {errors.medicare_id && <p className="mt-1 text-xs text-destructive">{errors.medicare_id}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Date of Birth</label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input type="number" placeholder="MM" min={1} max={12} value={form.dob_month} onChange={(e) => handleChange("dob_month", e.target.value)} className={inputClass("dob_month")} />
            {errors.dob_month && <p className="mt-1 text-xs text-destructive">{errors.dob_month}</p>}
          </div>
          <div>
            <input type="number" placeholder="DD" min={1} max={31} value={form.dob_day} onChange={(e) => handleChange("dob_day", e.target.value)} className={inputClass("dob_day")} />
            {errors.dob_day && <p className="mt-1 text-xs text-destructive">{errors.dob_day}</p>}
          </div>
          <div>
            <input type="number" placeholder="YYYY" min={1900} max={new Date().getFullYear()} value={form.dob_year} onChange={(e) => handleChange("dob_year", e.target.value)} className={inputClass("dob_year")} />
            {errors.dob_year && <p className="mt-1 text-xs text-destructive">{errors.dob_year}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Zip Code</label>
        <input type="text" placeholder="Zip Code" maxLength={10} value={form.zip_code} onChange={(e) => handleChange("zip_code", e.target.value)} className={inputClass("zip_code")} />
        {errors.zip_code && <p className="mt-1 text-xs text-destructive">{errors.zip_code}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
        <textarea placeholder="Any additional details..." maxLength={1000} rows={3} value={form.message} onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClass("message")} min-h-[80px]`} />
      </div>

      {/* Prescription Upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Prescription (RX) Upload</label>
        <p className="mb-2 text-xs text-muted-foreground">Upload your prescription if available (PDF, JPG, PNG — max 10MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
              toast({ title: "Invalid file type", description: "Please upload a PDF, JPG, or PNG file.", variant: "destructive" });
              return;
            }
            if (file.size > MAX_FILE_SIZE) {
              toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
              return;
            }
            setRxFile(file);
          }}
        />
        {rxFile ? (
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{rxFile.name}</p>
              <p className="text-xs text-muted-foreground">{(rxFile.size / 1024).toFixed(0)} KB</p>
            </div>
            <button type="button" onClick={() => { setRxFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <Upload className="h-4 w-4" />
            Choose File
          </button>
        )}
      </div>

      <div className="rounded-lg bg-muted p-4 text-xs text-muted-foreground leading-relaxed">
        <p className="font-semibold text-foreground mb-1">DISCLAIMER</p>
        <p>
          By clicking "Submit", I give Squad Medical Supplies, a Medicare-accredited supplier of medical equipment, my express written consent to
          contact me by phone, text message, or prerecorded message at the number I provided. I understand my information will be protected.
        </p>
      </div>

      <button type="submit" disabled={loading}
        className="w-full rounded-lg bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;

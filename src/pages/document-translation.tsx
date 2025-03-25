import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Check } from "lucide-react";

export function DocumentTranslationPage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Document Translation</h1>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Document</CardTitle>
              <CardDescription>
                We support a wide range of file formats including PDF, Word, Excel, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="file">Upload File</Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12">
                      <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your file here or click to browse
                      </p>
                      <Input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        Browse Files
                      </Button>
                      {file && (
                        <div className="mt-4 flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4" />
                          <span>{file.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sourceLanguage">Source Language</Label>
                      <Select
                        value={sourceLanguage}
                        onValueChange={setSourceLanguage}
                      >
                        <SelectTrigger id="sourceLanguage">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="targetLanguage">Target Language</Label>
                      <Select
                        value={targetLanguage}
                        onValueChange={setTargetLanguage}
                      >
                        <SelectTrigger id="targetLanguage">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements or context for the translation"
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-end px-0 pt-6">
                  <Button type="submit" disabled={!file || !sourceLanguage || !targetLanguage}>
                    Continue
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Translation Details</CardTitle>
              <CardDescription>
                Review your translation request and provide payment details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Document Information</h3>
                  <div className="rounded-lg border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">File Name</p>
                        <p>{file?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">File Size</p>
                        <p>{(file?.size ? file.size / 1024 : 0).toFixed(2)} KB</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Source Language</p>
                        <p>{sourceLanguage === "en" ? "English" : 
                           sourceLanguage === "es" ? "Spanish" : 
                           sourceLanguage === "fr" ? "French" : 
                           sourceLanguage === "de" ? "German" : 
                           sourceLanguage === "it" ? "Italian" : 
                           sourceLanguage === "pt" ? "Portuguese" : 
                           sourceLanguage === "ru" ? "Russian" : 
                           sourceLanguage === "zh" ? "Chinese" : 
                           sourceLanguage === "ja" ? "Japanese" : 
                           sourceLanguage === "ko" ? "Korean" : sourceLanguage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Target Language</p>
                        <p>{targetLanguage === "en" ? "English" : 
                           targetLanguage === "es" ? "Spanish" : 
                           targetLanguage === "fr" ? "French" : 
                           targetLanguage === "de" ? "German" : 
                           targetLanguage === "it" ? "Italian" : 
                           targetLanguage === "pt" ? "Portuguese" : 
                           targetLanguage === "ru" ? "Russian" : 
                           targetLanguage === "zh" ? "Chinese" : 
                           targetLanguage === "ja" ? "Japanese" : 
                           targetLanguage === "ko" ? "Korean" : targetLanguage}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Pricing</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <p>Standard Translation</p>
                      <p>$0.10 per word</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between font-medium">
                      <p>Estimated Total</p>
                      <p>$25.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between px-0 pt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Proceed to Payment
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Translation Submitted</CardTitle>
              <CardDescription>
                Your translation request has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Thank You!</h3>
              <p className="mt-2 text-center text-muted-foreground">
                We have received your document and will begin the translation process.
                You will receive an email notification when your translation is ready.
              </p>
              <Button className="mt-6" onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import { FileDropzone } from "@/components/FileDropzone";

export default function BulkAddWorker() {
  const handleFiles = (files: File[]) => {
    const file = files[0];
    Papa.parse(file, {
      header: true,
      complete: (res) => {
        console.log("parsed data", res.data); // now you have your array of workers
      },
      error: (err) => {
        console.error("parse error", err);
      },
    });
  };
  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-24 flex flex-col">
      <PageHeader title="Bulk Add Worker" />
      <div>
        <Input className="" type="file" />
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <FileDropzone onFiles={handleFiles} />

        <Button className="text-xs h-auto text-primary">Submit</Button>
      </div>
    </div>
  );
}

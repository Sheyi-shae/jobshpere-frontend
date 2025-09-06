"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";


export function DeleteAlertDialog({ slug, job }) {
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient= useQueryClient()

  const handleDeleteJob = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${slug}/delete-job/${job.slug}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Job deleted successfully!");
        queryClient.invalidateQueries(["jobs", "draft-jobs"]);
        setOpen(false); // ✅ close only on success
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete job. Please try again.");
     // console.log("Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-red-600 hover:bg-red-700 hover:scale-105 hover:cursor-pointer"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-800 text-2xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            job and remove its data from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDeleteJob}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleting}
          >
            <Trash2 className={`${deleting ? "animate-spin" : ""}`} />
            {deleting ? "Deleting..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

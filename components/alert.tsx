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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/useDialog";
import Link from "next/link";

export function AlertDialogDemo() {
  const { isOpen, onClose } = useDialog();

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            <img src="/alert.png" alt="" className="my-4" />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-2">
            <p className="text-2xl text-black">You have added 1 farm!</p>
            <p className="mt-1 text-[15px]">
              would you like to add another farm?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center flex-col gap-3 mt-5">
          <AlertDialogAction className="bg-[#0D8A6A]">
            <Link href={"/login"} className="w-full h-full">
              No, create my account
            </Link>
          </AlertDialogAction>
          <AlertDialogCancel className="justify-center mt-2">
            <Link href={"/new-farm"} className="w-full h-full">
              <button className="w-full h-full" onClick={onClose}>
                Yes, I have another farm
              </button>
            </Link>
          </AlertDialogCancel>
        </div>
        {/* <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>No, create my account</AlertDialogCancel>
          <AlertDialogAction>Yes, I have another farm</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
